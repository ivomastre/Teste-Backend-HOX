const { Model, DataTypes } = require('sequelize');
const Product = require("./product")
const Category = require("./category")
class ProductCategory extends Model {
    static init(sequelize) {
        super.init({
            categoryId: {
                model: Category, // 'Movies' would also work
                key: 'id'
            },
            productId: {
                model: Product, // 'Movies' would also work
                key: 'id'
            }
        }, {
            sequelize
        })
    }

}
module.exports = ProductCategory;
