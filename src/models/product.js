
const { Model, DataTypes } = require('sequelize')
class Product extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING
      },
      manufacturingDate: {
        type: DataTypes.DATE
      },
      perishableProduct: {
        type: DataTypes.BOOLEAN
      },
      expirationDate: {
        type: DataTypes.DATE
      },
      price: {
        type: DataTypes.DECIMAL(10, 2)
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Category, { allowNull: true })
  }
}

module.exports = Product
