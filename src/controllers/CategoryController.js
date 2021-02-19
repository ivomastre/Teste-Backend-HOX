const Category = require('../models/category.js')

module.exports = {
  async store (req, res) {
    const { name } = req.body
    const category = await Category.create({ name })
    return res.json(category)
  },
  async index (req, res) {
    const { order, orderBy } = req.query
    const page = req.query.page || 0
    let limit

    if (page) {
      limit = 10
    }

    let orderQuery = [[orderBy, order]]
    if (!orderBy && !order) {
      orderQuery = undefined
    }
    let offset = (page * 10) - 10
    if (offset < 0) {
      offset = 0
    }
    const categories = await Category.findAll(
      { order: orderQuery, limit, offset: offset }
    )

    return res.json(categories)
  },

  async delete (req, res) {
    const { id } = req.params
    await Category.destroy({ where: { id } })
    return res.json({})
  },
  async update (req, res) {
    const { id } = req.params
    const { name } = req.body

    await Category.update({ name }, {
      where: {
        id
      }
    })
    const updatedCategory = await Category.findByPk(id)
    return res.json({ updatedCategory })
  }

}
