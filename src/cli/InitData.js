/*
truncate table stories;
TRUNCATE table chapters;
TRUNCATE table chapters_intro;
TRUNCATE table comments;
TRUNCATE table story_sources;
TRUNCATE table authors;
*/

import fs from 'fs'
import { Op } from 'sequelize'
import _ from 'lodash'

import {
  CatRepo,
  AuthorRepo,
  StoryRepo,
  ChapterRepo,
  ChapterIntroRepo,
  CommentRepo,
  StorySourceRepo
} from 'repos'
import { getStatus } from 'helpers/StoryHelper'
import { genSlug } from 'helpers/StringHelper'
import TruyenfullCom from 'services/sources/TruyenfullCom'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const catRepo = new CatRepo()
console.log(catRepo)
const chapterRepo = new ChapterRepo()
const chapterIntroRepo = new ChapterIntroRepo()
const storyRepo = new StoryRepo()
const authorRepo = new AuthorRepo()
const commentRepo = new CommentRepo()
const storySourceRepo = new StorySourceRepo()

async function getUrlPages (start, end) {
  const max = end

  const urls = []
  for (let i = start; i <= max; i++) { if (i > 0) urls.push(`https://truyenfull.com/truyen-moi-cap-nhat/trang-${i}/`) }

  let data = []
  const urlPromise = urls.map(async (url) => {
    const urlPart = await TruyenfullCom.getInit(url)
    data = data.concat(urlPart)
  })

  await Promise.all(urlPromise)
  return data
}

async function getUrls () {
  const page = 1
  const max = 906

  let data = []

  for (let i = 1; i <= 906; i++) {
    const urls = await getUrlPages(i, i + 3)
    console.log('doing', i, urls.length)
    if (urls.length === 0) { fs.appendFileSync('./nourl', i + '\n') }

    data = data.concat(urls)
    await sleep(10)
  }

  fs.writeFileSync('./urls', JSON.stringify(data))
}

async function getStories (url) {
  const storyInfo = await TruyenfullCom.getDetail(url)
  if(storyInfo === false) return false
  //console.log(storyInfo); return;
  const cats = await _processCategories(storyInfo.categories)
  const authorId = await _processAuthor(storyInfo.author)

  const storyData = {
    title: storyInfo.name,
    slug: storyInfo.slug,
    image: storyInfo.image,
    status: getStatus(storyInfo.status),
    views: storyInfo.views,
    cat_id1: cats[0],
    author_id: authorId,
    description: storyInfo.desc
  }

  if (cats.length >= 2) { storyData.cat_id2 = cats[1] }
  if (cats.length === 3) { storyData.cat_id3 = cats[2] }

  let story = await storyRepo.getConditions({ slug: storyData.slug })
  if (!story) { story = await storyRepo.create(storyData) }

  const checkSource = await storySourceRepo.getConditions({ story_id: story.id, source_story_id: storyInfo.storyId })
  if (!checkSource) {
    await storySourceRepo.create({
      story_id: story.id,
      source_story_id: storyInfo.storyId,
      source_story_url: url
    })
  }

  story.storySlug = storyInfo.storySlug
  await _processChapters(story, storyInfo.lastChap)
  fs.appendFileSync('./processed', url + '\n')

  await _processComments(story.id, storyInfo.reviews)
  console.log('done', story.title, storyInfo.reviews.length)
}

async function _processAuthor (name) {
  let author = await authorRepo.getConditions({ name })
  const slug = genSlug(name)
  if (!author) {
    author = await authorRepo.create({
      name,
      slug
    })
  }

  return author.id
}

async function _processCategories (categories) {
  const cats = []
  for (let i in categories) {
    const name = categories[i]
    const slug = genSlug(name)
    i++
    let cat = await catRepo.getConditions({ name })

    if (!cat) {
      cat = await catRepo.create({
        name,
        slug
      })
    }

    cats.push(cat.id)
  }

  return cats
}

async function _processChapters (story, maxChapter) {
  let fail = 0;
  for (let i = maxChapter; i > story.last_chapter; i--) {
    const url = `https://truyenfull.com/${story.storySlug}/chuong-${i}.html`
    const chapter = await TruyenfullCom.getChapter(url)

    if(chapter === false) fail ++
    else fail = 0
      
    if(fail >= 10) break

    if (chapter === false) continue

    let chapIntro = await chapterIntroRepo.getConditions({
      story_id: story.id,
      chapter_number: chapter.chapterNum
    })

    if (chapIntro) continue

    chapIntro = await chapterIntroRepo.create({
      title: chapter.name,
      slug: chapter.slug,
      story_id: story.id,
      chapter_number: chapter.chapterNum,
      views: 0
    })

    await chapterRepo.create({
      chapter_intro_id: chapIntro.id,
      content: chapter.content
    })

    const s = await storyRepo.get(story.id)
    // /console.log(s.id, s.chapters, s.slug, i, chapter.chapterNum, 'logxxx')
    await storyRepo.updateIncrement(story.id, 'chapters')
    await storyRepo.updateConditions({
      id: story.id,
      last_chapter: {
         [Op.lt]: i
      }
    },
    {
      last_chapter: i
    }
    )
  }
}

async function _processComments (storyId, reviews) {
  for (const r of reviews) {
    const check = await commentRepo.getConditions({ source_review_id: r.reviewID, story_id: storyId })
    if (check) continue

    await commentRepo.create({
      title: r.title,
      content: r.comment,
      story_id: storyId,
      source_review_id: r.reviewID
    })
  }
}

// todo xu ly reviews
async function init () {
  let urls = fs.readFileSync('./urls')
  urls = JSON.parse(urls)
  let subs = []
  urls = _.uniq(urls)
  let start = process.env.SKIP ? parseInt(process.env.SKIP) : 0;
  for (let i = start; i < urls.length; i++) {
    if (i >= 100000) break
    subs.push(urls[i])
    if ((i + 1) % 15 === 0) {
      const partPromise = subs.map(async (u) => {
        await getStories(u)
      })
      await Promise.all(partPromise)
      subs = []
    }
  }
  console.log('done')
  process.exit()
}

async function update() {
  let data = []
  const urls = await getUrlPages(1, 2)
  data = data.concat(urls)

  console.log(data, 'need to check')
  let subs = []
  for (let i = 0; i < data.length; i++) {
    if (i >= 60) break
    subs.push(data[i])
    if ((i + 1) % 10 === 0) {
      const partPromise = subs.map(async (u) => {
        await getStories(u)
      })
      await Promise.all(partPromise)
      subs = []
    }
  }
  console.log('done')
  process.exit()
}

async function main() {
  let args = process.argv

  let act
  if(args.length === 0 || args[2] === 'init')
	act = 'init'
  else act = 'update'

  if(act === 'init')
    await init()
  else 
    await update()
}

main()
