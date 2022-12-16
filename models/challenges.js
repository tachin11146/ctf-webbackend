'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class challenges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  challenges.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    quiz: DataTypes.STRING,
    flag: DataTypes.STRING,
    file: DataTypes.STRING,
    hint: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'challenges',
  });
  return challenges;
};