module.exports = class BaseRepo {
  constructor () {
    this.model = null
  }

  makeModel (model) {
    this.model = model
  }

  get (id) {
    return this.model.get(id)
  }

  create (data) {
    return this.model.add(data)
  }

  update (id, data) {
    return this.model.edit(id, data)
  }

  updateIncrement (id, field) {
    return this.model.editIncrement(id, field)
  }

  updateConditions (conditions, data) {
    return this.model.editByConditions(conditions, data)
  }

  getConditions (conditions) {
    return this.model.getByConditions(conditions)
  }

  delete (id) {
    return this.model.remove({ id: id })
  }

  deleteConditions (conditions) {
    return this.model.remove(conditions)
  }

  latest () {
    return this.model.latest()
  }

  oldest () {
    return this.model.oldest()
  }
}
