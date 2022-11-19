'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sorarios', {
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
      sucursalId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Sucursals', 
          key: 'id',
          as: 'sucursalId'
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
    await queryInterface.dropTable('Sorarios');
  }
};