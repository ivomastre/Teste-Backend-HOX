const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config.js')
const Product = require('../models/product.js')
const Category = require('../models/category.js')
const connection = new Sequelize(dbConfig)

Product.init(connection);
Category.init(connection);
Product.associate(connection.models);
Category.associate(connection.models);
module.exports = connection
