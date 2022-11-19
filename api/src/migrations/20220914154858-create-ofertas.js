'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ofertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      vinicio: {
        type: Sequelize.DATE
      },
      vfin: {
        type: Sequelize.DATE
      },
      filename: {
        type: Sequelize.STRING
      },
      detalle: {
        type: Sequelize.STRING
      },
      vigencia: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER
      },
      views: {
        type: Sequelize.INTEGER
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Clientes', 
          key: 'id',
          as: 'clienteId'
        }        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ofertas');
  }
};