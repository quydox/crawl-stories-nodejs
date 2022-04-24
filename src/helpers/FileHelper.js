import path from 'path'

const getFileNameFromUrl = (url) => {
  const parsed = new URL(url)
  return path.basename(parsed.pathname)
}

module.exports = {
  getFileNameFromUrl
}
