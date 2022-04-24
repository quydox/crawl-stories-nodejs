import { Cat } from 'models'
import BaseRepo from 'repos/BaseRepo'

module.exports = class CatRepo extends BaseRepo {
  constructor () {
    super()
    this.makeModel(Cat)
  }
}
