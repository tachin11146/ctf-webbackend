'use strict';
const generator = require('generate-password');

const {
  Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async createTeam(name, key) {
      await teams.create({name: name, key: key})
      return {error: false}
    };

    static async findTeamByKey(key){
      const result = await teams.findOne({where: {key: key}})
      if (result) {
        return result.id
      }
      return null
    }

    static async findTeamByName(name){
      const result = await teams.findOne({where: {name: name}})
      if (result) {
        return result.id
      }
      return null
    }

  }
  teams.init({
    name: { type: DataTypes.STRING, allowNull: false},
    key: { type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};