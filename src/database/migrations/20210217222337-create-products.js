'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING
      },
      manufacturingDate: {
        type: Sequelize.DATE
      },
      perishableProduct: {
        type: Sequelize.BOOLEAN
      },
      expirationDate: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        type: Sequelize.DATE,
        
      },
      updatedAt: {
        type: Sequelize.DATE,

      }
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
