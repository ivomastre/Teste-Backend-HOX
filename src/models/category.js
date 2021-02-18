const ProductCategory = require("./productCategory")
const { Model, DataTypes } = require('sequelize');
class Category extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING
            },
        }, {
            sequelize
        })
    }
    static associate(models){
        this.belongsToMany(models.Product, { through: ProductCategory, as: "categories"})
    }
}
module.exports = Category;


