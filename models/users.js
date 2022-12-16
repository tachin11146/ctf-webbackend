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

    static text_to_hash(password){
      return crypto.createHash('md5').update(password).digest('hex');
    }
    
    static async create_user(first_name, last_name, email, password, picture, score, team_id){
      users.count({distinct: 'email'})
      .then( async (count) => {
          if (count > 0){
              const old_user = await users.findOne({ where: {email: email} })
              if (old_user) {
                return {message: "This e-mail has already been used.", status: 200};
              }
          }
      });

      const user = await users.create({ first_name: first_name, last_name: last_name, email: email, password: users.text_to_hash(password), picture: picture, score: score, team_id: team_id});

      return {message: "Success", status: 200};
    }
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