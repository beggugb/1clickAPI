'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'categoria',
      });
      Cliente.hasMany(models.Horario,{
        foreignKey: 'clienteId',
        as: 'horario',
      })
      Cliente.hasMany(models.Cajero,{
        foreignKey: 'clienteId',
        as: 'cajero',
      })
    }
    
  }
  Cliente.init({
    nombres: DataTypes.STRING,
    direccion: DataTypes.STRING,
    nit: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    web: DataTypes.STRING,
    filename: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    habilitado: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    snum: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    portada: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    tiktok: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    tipo: DataTypes.STRING,
    icon: DataTypes.STRING,
    banner: DataTypes.STRING,
    slider: DataTypes.STRING,
    video: DataTypes.STRING,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    nivel: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};