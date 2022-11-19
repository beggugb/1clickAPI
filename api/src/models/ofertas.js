'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ofertas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ofertas.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'cliente',
      });
    }
  };
  Ofertas.init({
    titulo: DataTypes.STRING,
    vinicio: DataTypes.DATE,
    vfin: DataTypes.DATE,
    filename: DataTypes.STRING,
    detalle: DataTypes.STRING,
    vigencia: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ofertas',
  });
  return Ofertas;
};