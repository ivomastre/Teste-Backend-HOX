const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')
const verifyToken = require('../middleware/authJwt')

router.get('/category', verifyToken, CategoryController.index)
router.get('/category/:id/', verifyToken, CategoryController.show)
router.post('/category', verifyToken, CategoryController.store)
router.delete('/category/:id/', verifyToken, CategoryController.delete)
router.put('/category/:id/', verifyToken, CategoryController.update)
module.exports = router
