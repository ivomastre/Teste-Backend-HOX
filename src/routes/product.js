var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/ProductController')

router.get('/product', ProductController.index)
router.get('/product/:categories/', ProductController.index_filter_product)
router.post('/product', ProductController.store)
module.exports = router;
