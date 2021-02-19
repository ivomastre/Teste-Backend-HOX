const Product = require('../models/product.js')
const Category = require('../models/category.js')

module.exports = {
  async store (req, res) {
    const { name, CategoryId, manufacturingDate, perishableProduct, expirationDate, price } = req.body
    const manufacturing = new Date(manufacturingDate)
    const expiration = new Date(expirationDate)
    if (manufacturing > expiration) {
      return res.status(400).json({ message: 'Manufacturing date is higher than expiration date' })
    }
    if (CategoryId) {
      const category = await Category.findByPk(CategoryId)
      console.log(category)
      if (!category) {
        return res.status(400).json({ message: 'Category not found' })
      }
    }
    const product = await Product.create({ name, CategoryId, manufacturingDate, perishableProduct, expirationDate, price })
    return res.json(product)
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
    console.log(offset)
    const products = await Product.findAll(
      { order: orderQuery, limit, offset: offset }
    )
    return res.json(products)
  },
  async index_filter_categories (req, res) {
    const { categoryId } = req.params
    console.log(categoryId)
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
    console.log(offset)
    const products = await Product.findAll(
      { order: orderQuery, limit, offset: offset, where: { categoryId } }
    )
    return res.json(products)
  },

  async delete (req, res) {
    const { id } = req.params
    await Product.destroy({ where: { id } })
    return res.json({})
  },
  async update (req, res) {
    const { id } = req.params
    const { name, CategoryId, manufacturingDate, perishableProduct, expirationDate, price } = req.body
    const manufacturing = new Date(manufacturingDate)
    const expiration = new Date(expirationDate)
    if (manufacturing > expiration) {
      return res.status(400).json({ message: 'Manufacturing date is higher than expiration date' })
    }
    await Product.update({ name, CategoryId, manufacturingDate, perishableProduct, expirationDate, price }, {
      where: {
        id
      }
    })
    const updatedProduct = await Product.findByPk(id)
    return res.json({ updatedProduct })
  }
}
