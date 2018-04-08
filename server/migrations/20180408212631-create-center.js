'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        defaultValue:
          'https://pieceloveandchocolate.com/product/plc-dairy-freevegan-chocoholics-delight-gift-basket',
        type: Sequelize.TEXT
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      equipments: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      availability: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      owner: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'owner'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Centers');
  }
};
