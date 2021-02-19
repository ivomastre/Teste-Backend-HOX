const Category = require('../models/category.js')

module.exports = {
  async store (req, res) {
    const { name } = req.body
    const category = await Category.create({ name })
    return res.json(category)
  },
  async index (req, res) {
    const { order } = req.body
    const page = req.query.page || 0
    const limit = req.query.limit || 10
    const Categories = await Category.findAll(
      { order: [['name', order || 'DESC']], limit, offset: page * 10 }
    )

    return res.json(Categories)
  }

}
