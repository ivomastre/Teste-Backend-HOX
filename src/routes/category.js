const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')
const verifyToken = require('../middleware/authJwt')

router.get('/category', verifyToken, CategoryController.index)
router.post('/category', verifyToken, CategoryController.store)
module.exports = router
