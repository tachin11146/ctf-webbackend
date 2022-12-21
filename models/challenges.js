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
    name: { type: DataTypes.STRING, allowNull: false},
    categoryId: { type: DataTypes.INTEGER, allowNull: false},
    score: { type: DataTypes.INTEGER, allowNull: false},
    quiz: { type: DataTypes.STRING, allowNull: false},
    flag: { type: DataTypes.STRING, allowNull: false},
    file: { type: DataTypes.STRING, allowNull: true},
    hint: { type: DataTypes.STRING, allowNull: true}
  }, {
    sequelize,
    modelName: 'challenges',
  });
  return challenges;
};