
const { Model, DataTypes } = require('sequelize')
class Category extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.hasMany(models.Product, { as: 'Category', foreignKey: { name: 'CategoryId', allowNull: true } })
  }
}
module.exports = Category
