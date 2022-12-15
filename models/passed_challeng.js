'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passed_challeng extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  passed_challeng.init({
    user_id: DataTypes.INTEGER,
    challeng_id: DataTypes.INTEGER,
    passed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'passed_challeng',
  });
  return passed_challeng;
};