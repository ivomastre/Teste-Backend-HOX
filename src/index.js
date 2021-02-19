const express = require('express')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const app = express()
require('./database')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(categoryRouter)
app.use(productRouter)
app.use(userRouter)

module.exports = app
