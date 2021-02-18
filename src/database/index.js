const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config.js')
const ProductCategory = require("../models/productCategory")
const Product = require('../models/product.js')
const Category = require('../models/category.js')
const connection = new Sequelize(dbConfig)

Product.init(connection);
Category.init(connection);
console.log(connection.models)
Product.associate(connection.models);
Category.associate(connection.models);
ProductCategory.associate(connection.models);
module.exports = connection
