import { StorySource } from 'models'
import BaseRepo from 'repos/BaseRepo'

module.exports = class StorySourceRepo extends BaseRepo {
  constructor () {
    super()
    this.makeModel(StorySource)
  }
}
