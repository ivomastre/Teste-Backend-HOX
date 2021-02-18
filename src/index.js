var express = require('express');
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');

var app = express();
require('./database')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use(productRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
