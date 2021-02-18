
const { Model, DataTypes } = require('sequelize');
class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            
        }, {
            sequelize
        })
    }
    static associate(models) {
        
    }
}

module.exports = User;


