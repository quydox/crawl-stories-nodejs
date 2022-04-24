import { Chapter } from 'models'
import BaseRepo from 'repos/BaseRepo'

module.exports = class ChapterRepo extends BaseRepo {
  constructor () {
    super()
    this.makeModel(Chapter)
  }
}
