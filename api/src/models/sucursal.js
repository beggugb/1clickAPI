'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sucursal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sucursal.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'cliente',
      });
      Sucursal.hasMany(models.Sorario,{
        foreignKey: 'sucursalId',
        as: 'sorario',
      })
    }
  }
  Sucursal.init({
    nombre: DataTypes.STRING,
    estado: DataTypes.STRING,
    direccion: DataTypes.STRING,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.STRING,
    hestado: DataTypes.BOOLEAN,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    tipo: DataTypes.STRING,
    icon: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    clienteId: DataTypes.INTEGER,
    portada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sucursal',
  });
  return Sucursal;
};