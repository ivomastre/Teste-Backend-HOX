const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const verifyToken = require('../middleware/authJwt')

router.get('/product', verifyToken, ProductController.index)
router.get('/product/:categories/', verifyToken, ProductController.index_filter_categories)
router.post('/product', verifyToken, ProductController.store)
module.exports = router
