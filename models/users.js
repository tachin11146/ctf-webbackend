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
      // users.models = models;

      // users.hasOne(models.teams, {
      //   as: "member",
      //   foreignKey: "user_id",
      //   otherKey: "team_id"
      // })
    }

    static hashedText(password){
      return crypto.createHash('md5').update(password).digest('hex');
    }
    
    static async createUser(firstname, lastname, email, password, picture, score, team_id){
      users.count({distinct: 'email'})
      .then( async (count) => {
          if (count > 0){
              const old_user = await users.findOne({ where: {email: email} })
              if (old_user) {
                return {message: "This e-mail has already been used.", status: 400};
              }
          }
      });

      const user = await users.create({ firstname: firstname, lastname: lastname, email: email, password: users.hashedText(password), picture: picture, score: score, team_id: team_id});

      return {message: "Succes", status: 200};
    }

    static async loginUser(email, password){
      const oldUser = await users.findOne({ where: {email: email} });

      if (users.hashedText(password) == oldUser.password) {
        return {message: "Succes", status: 200}
      }
      
      return {message: "fail", status: 400};
    };
  }
  users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    score: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};