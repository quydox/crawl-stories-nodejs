import { ChapterIntro } from 'models'
import BaseRepo from 'repos/BaseRepo'

module.exports = class ChapterIntroRepo extends BaseRepo {
  constructor () {
    super()
    this.makeModel(ChapterIntro)
  }
}
