import {
  get
} from 'helpers/RequestHelper'

import fs from 'fs'

import cheerio from 'cheerio'

exports.getInit = async (url) => {
  const html = await get(url)
  const $ = cheerio.load(html)

  const urls = []
  $('.list-truyen .row').each(function () {
    const t = $(this).find('.truyen-title a').attr('title')
    const u = $(this).find('.truyen-title a').attr('href')
    if (t && u) { 
      console.log(u, t)
      fs.appendFileSync('./fuk', u + "\n")
      urls.push(u) 
    }
  })

  return urls
}
