import {
  get
} from 'helpers/RequestHelper'
import { stripTags, genSlug } from 'helpers/StringHelper'
import { runShellCommand } from 'helpers/ShellHelper'

import fs from 'fs'
import cheerio from 'cheerio'

exports.getInit = async (url) => {
  const html = await runShellCommand(`curl ${url}`)
  const $ = cheerio.load(html)

  const urls = []
  $('.story-name').each(function () {
    const t = $(this).find('.story-name h3 a').text().trim()
    const u = $(this).find('.story-name h3 a').attr('href')
    console.log(t, u)
    if (t && u) {
      fs.appendFileSync('./fuk', u + '\n')
      urls.push(u)
    }
  })

  return urls
}

exports.getDetail = async (url) => {
  const html = await runShellCommand(`curl ${url}`)
  if (html === false) return false
  const $ = cheerio.load(html)
  const name = $('h1.story-name').text().trim()
  const author = $('.info table th:nth-child(1)').text().trim()
  const cats = $('.info table th:nth-child(3)').text().trim()

  console.log(url, name, author, cats); process.exit()

  const categories = []

  cats.each(function () {
    if (categories.length < 3) { categories.push($(this).text()) }
  })

  const metas = $('.story-info .story-metas div')

  let status, views, rates
  metas.each(function () {
    const label = $(this).find('label').text()
    const data = $(this).find('strong').text()

    if (label === 'Lượt xem') views = parseInt(data.replace(',', ''))
    if (label === 'Tình trạng') status = data
  })

  const image = $('.story-cover img').attr('src')
  const image_medium = image ? image.replace('_large', '_medium') : null
  const desc = stripTags($('.story-desc').html(), '<p>').replace(/\.\sNếu yêu thích thể loại này.*$/, '')

  let reviews = []

  const m = url.match(/\/(.*)\.(\d+)\/$/)
  const storyId = m[2]
  const slug = m[1].split('/')[2]
  let rv = await get('https://truyenfull.com/api/review?storyID=' + storyId)
  try {
    rv = JSON.parse(rv)
  } catch (e) { rv = [] }

  reviews = rv.reviews
  // console.log(reviews)
  const lastChapUrl = $('.last-chapters a:nth-child(2)').attr('href')
  if (lastChapUrl === undefined || lastChapUrl === null) return false
  const f = lastChapUrl.match(/chuong-(\d+)/)
  if (f === undefined || f === null) return false
  const lastChap = parseInt(f[1])
  const storySlug = lastChapUrl.split('/')[3]

  // console.log(name, author, categories, views, status, image, image_medium, desc)

  return {
    storyId,
    reviews,
    name,
    slug,
    storySlug,
    author,
    views,
    status,
    image,
    image_medium,
    desc,
    categories,
    lastChap
  }
}

exports.getChapter = async (url) => {
  let $
  try {
    const html = await get(url)
    $ = cheerio.load(html)
    console.log('get0', url, html.length)
  } catch (e) {
    fs.appendFileSync('./crawler', `${new Date()}|${JSON.stringify(e)}\n`)
    try {
      const html = await get(url)
      console.log('get', url, html.length)
      $ = cheerio.load(html)
    } catch (e) {
      return false
    }
  }

  let name = $('.chapter-name').text().trim()
  const m = name.match(/Chương\s(\d+)(.*)$/)

  if (m === undefined || m === null) return false

  console.log(url, 'chapurl') // xu ly chapter 1-1 1-2
  name = m[2].replace(/^\s?:\s/, '')
  name = name.substr(0, 199)
  const number = m[1]
  const slug = genSlug(name)
  const $content = $('#chapter-content')
  $content.find('.ads').remove()
  const content = $content.html()

  const x = url.match(/chuong-(\d+).html/)
  const chapterNum = x[1]

  return {
    name,
    slug,
    chapterNum,
    number,
    content
  }
}
