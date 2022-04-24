import { Comment } from 'models'
import BaseRepo from 'repos/BaseRepo'

module.exports = class CommentRepo extends BaseRepo {
  constructor () {
    super()
    this.makeModel(Comment)
  }
}
