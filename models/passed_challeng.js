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
    userId: { type: DataTypes.INTEGER, allowNull: false},
    challengId: { type: DataTypes.INTEGER, allowNull: false},
    passed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  }, {
    sequelize,
    modelName: 'passed_challeng',
  });
  return passed_challeng;
};