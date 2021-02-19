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
// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
