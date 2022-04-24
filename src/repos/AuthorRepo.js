import { Author } from 'models'
import BaseRepo from 'repos/BaseRepo'

module.exports = class AuthorRepo extends BaseRepo {
  constructor () {
    super()
    this.makeModel(Author)
  }
}
