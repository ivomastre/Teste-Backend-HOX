const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const verifyToken = require('../middleware/authJwt')

router.get('/product', verifyToken, ProductController.index)
router.get('/product/:categoryId/', verifyToken, ProductController.index_filter_categories)
router.post('/product', verifyToken, ProductController.store)
router.delete('/product/:id/', verifyToken, ProductController.delete)
router.put('/product/:id/', verifyToken, ProductController.update)
module.exports = router
