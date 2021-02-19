const Product = require('../models/product.js')

module.exports = {
  async store (req, res) {
    const { name, categoryId, manufacturingDate, perishableProduct, expirationDate, price } = req.body
    const product = await Product.create({ name, categoryId, manufacturingDate, perishableProduct, expirationDate, price })
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
    const { order, orderBy } = req.body
    const page = req.query.page || 0
    const limit = req.query.limit || 0
    const products = await Product.findAll(
      { order: [[orderBy || '', order || '']], limit, offset: ((page * 10) - 10) }
    )
    return res.json(products)
  }
}
