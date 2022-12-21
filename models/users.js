'use strict';
const crypto = require('crypto');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async findAllUserByTeamId(id) {
      const user = await users.findAll({ where: { teamId: id } })
      return user
    }

    static hashedText(password){
      return crypto.createHash('md5').update(password).digest('hex');
    }
    
    static async createUser(firstname, lastname, email, password){
      await users.create({ firstname: firstname, lastname: lastname, email: email, password: users.hashedText(password), picture: "no", score: 0, team_id: -1});
      return {error: false};
    }

    static async findUserByEmail(email){
      const user = await users.findOne({ where: { email: email } });
      return user
    }

    static async joinTeam(id, teamId){
      await users.update({ teamId: teamId }, { where: { id: id } });
      return {error: false}
    }
  }
  users.init({
    firstname: { type: DataTypes.STRING, allowNull: false},
    lastname: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.STRING, allowNull: false},
    picture: { type: DataTypes.STRING, allowNull: true},
    score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    teamId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: -1},
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};