var express = require('express');
var userRouter = require('./routes/user');
var productRouter = require('./routes/product');

var app = express();
require('./database')
require('dotenv').config()
console.log(process.env.SECRET)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRouter);
app.use(userRouter)
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
