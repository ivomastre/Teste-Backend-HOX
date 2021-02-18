const Product = require('../models/product.js')

module.exports = {
    async store(req, res){
        const { name } = req.body
        const product = await Product.create({ name });
        return res.json(product)
    },
    async index(req, res) {
        const { order } = req.body
        const page = req.query.page || 0
        const limit = req.query.limit || 10
        const products = await Product.findAll(
            { order: [['name', order || "DESC"]], limit, offset: page * 10}
        )

        return res.json(products)
    },
    async index_filter_product(req, res) {
        const { order } = req.body
        const page = req.query.page || 0
        const limit = req.query.limit || 10
        const { categories } = req.params
        const products = await Product.findAll(
            { order: [['name', order || "DESC"]], limit, offset: page * 10 }
        )
        return res.json(products)
    }
}