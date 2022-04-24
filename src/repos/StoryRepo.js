import { Story } from 'models'
import BaseRepo from 'repos/BaseRepo'

module.exports = class StoryRepo extends BaseRepo {
  constructor () {
    super()
    this.makeModel(Story)
  }
}
