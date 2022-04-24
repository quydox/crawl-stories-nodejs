import { Model } from 'sequelize'

module.exports = class Base extends Model {
  static async get (id) {
    return await this.findByPk(id, { raw: true })
  }

  static getByConditions (conditions) {
    return this.findOne({ where: conditions, raw: true })
  }

  static async getAll ($opts = { order_by: 'id', sort: 'DESC' }) {
    return await this.findAll({
      order: [[$opts.order_by, $opts.sort]],
      raw: true
    })
  }

  static async getAllByConditions (conditions, opts = { order_by: 'id', sort: 'DESC', limit: 1000000 }) {
    const orderBy = opts.order_by || 'id'
    const sort = opts.sort || 'DESC'
    const limit = opts.limit || 100000

    return await this.findAll({
      where: conditions,
      order: [[orderBy, sort]],
      limit: limit,
      raw: true
    })
  }

  static async add (data) {
    const createdObj = await this.create(data)
    return createdObj.dataValues
  }

  static async edit (id, data) {
    const updatedObj = await this.update(data, { where: { id: id }, returning: true, raw: true })
    return updatedObj[1][0]
  }

  static async editIncrement (id, field) {
    await this.increment(field, { where: { id: id } })
  }

  static async editByConditions (conditions, data) {
    const updatedObj = await this.update(data, { where: conditions, returning: true, raw: true })
    return updatedObj
  }

  static async remove (conditions) {
    return await this.destroy({ where: conditions })
  }

  static async latest () {
    return await this.findOne({ raw: true })
  }

  static async oldest () {
    return await this.findOne({
      order: [['id', 'ASC']],
      raw: true
    })
  }
}
