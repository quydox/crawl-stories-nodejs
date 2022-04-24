import slugify from 'slugify'
import striptags from 'striptags'

const randomString = (max = 20) => {
  return Math.random().toString(36).substr(2, max)
}

const removeSpecialChars = (str) => {
  return str.replace(/[^a-zA-Z0-9]/g, '')
}

const genSlug = (str) => {
  return slugify(str, {locale: 'vi'}).toLowerCase()
}

const stripTags = (data, allowedTags = '<p>') => {
  return striptags(data, allowedTags)
}

module.exports = {
  randomString,
  removeSpecialChars,
  genSlug,
  stripTags
}
