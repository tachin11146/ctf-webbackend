const models = require('../models');
const teamsModel = require('../models/teams');
const usersModel = require('../models/users');
const {  DataTypes } = require('sequelize');
const teams = teamsModel(models.sequelize, DataTypes);
const users = usersModel(models.sequelize, DataTypes);

exports.createTeam = async (req, res, next) => {
    const userInput = req.body
    if (!(userInput.name)){
        return res.json({message: "All input is require", status: 400})
    };
};

