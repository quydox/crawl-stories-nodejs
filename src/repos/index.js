import fs from 'fs'
import path from 'path'

const basename = path.basename(__filename)

const repos = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file !== 'BaseRepo') && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const repo = require(path.join(__dirname, file))
    const key = file.replace(/.js$/g, '')
      .split('.')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    repos[key] = repo
  })

module.exports = repos
