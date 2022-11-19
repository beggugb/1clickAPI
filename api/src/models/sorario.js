'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sorario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sorario.belongsTo(models.Sucursal, {
        foreignKey: 'sucursalId',
        as: 'sucursal',
      });
    }
  }
  Sorario.init({
    dia: DataTypes.STRING,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.STRING,
    sucursalId: DataTypes.INTEGER,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sorario',
  });
  return Sorario;
};