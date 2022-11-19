'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dia: {
        type: Sequelize.STRING
      },
      hinicio: {
        type: Sequelize.STRING
      },
      hfin: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Horarios');
  }
};