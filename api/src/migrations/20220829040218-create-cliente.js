'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      habilitado: {
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.STRING
      },
      snum: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      portada: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      instagram: {
        type: Sequelize.STRING
      },
      tiktok: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
      },
      tipo: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      slider: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      hinicio: {
        type: Sequelize.STRING
      },
      hfin: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER
      },
      views: {
        type: Sequelize.INTEGER
      },
      tags: {
        type: Sequelize.STRING
      },
      nivel: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Categoria', 
          key: 'id',
          as: 'categoriaId'
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
    await queryInterface.dropTable('Clientes');
  }
};