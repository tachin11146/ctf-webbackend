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

    static async generateKey(){
      
      var checkPassword = true
      var password
    while (checkPassword){
        password = generator.generate({
          length: 10,
          numbers: true
        });

        await teams.count({distinct: 'key'})
        .then( async (count) => {

            if (count > 0){
              const oldTeam = await teams.findOne({where: {key: password}})
              if ( !oldTeam ){
                checkPassword = false
              }
            } else {
              checkPassword = false
            }
        });
      }

      return password
      
    }

    static async createTeam(id, name) {
      var error
      var result
      await teams.count({distinct: 'name'})
      .then( async (count) => {
          if (count > 0){
              const oldTeam = await teams.findOne({ where: {name: name} })
              if (oldTeam) {
                // return false
                error =  {message: "This name has already been used.", status: 400};
              } 
          }
      });

      if (error) {
        return error
      } 
  
      await teams.generateKey()
      .then( async (key) => {
        await teams.create({name: name, key: key})
        await teams.getTeamId(key)
        .then((id) => {
          result = {message: "create team success", status: 200, teamId: id};
        })
      })

      return result
    };

    static async getTeamId(key){
      const result = await teams.findOne({where: {key: key}})
      if (result) {
        return result.id
      }
      return null
    }
  }
  teams.init({
    name: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teams',
  });
  return teams;
};