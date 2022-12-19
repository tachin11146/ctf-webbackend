'use strict';
const {
  Model
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

    static async createTeam(name) {
      users.count({distinct: 'name'})
      .then( async (count) => {
          if (count > 0){
              const oldTeam = await teams.findOne({ where: {name: name} })
              if (oldTeam) {
                return {message: "This name has already been used.", status: 400};
              }
          }
      });

      const team = await teams.create({name: name})

      return {message: "success", status: 400};
    };
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