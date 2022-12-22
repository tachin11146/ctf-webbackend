const models        = require('../models');
const teamsModel    = require('../models/teams');
const usersModel    = require('../models/users');
const { DataTypes } = require('sequelize');
const teams         = teamsModel(models.sequelize, DataTypes);
const users         = usersModel(models.sequelize, DataTypes);
const userService   = require('../services/users');
const teamService   = require('../services/teams')
const UserService   = new userService(users, teams);
const TeamService   = new teamService(users, teams)
require('../config/passport');

exports.createTeam = async (req, res, next) => {
    const user = res.locals.user
    const userInput = req.body
    if ( user.teamId != -1){
        return next({message: "You already have team", status: 400})
    }
    if (!(userInput.name)){
        return next({message: "All input is require", status: 400})
    };

    const team = await TeamService.createTeam(userInput.name)
    if (team.error){
        return next(team)
    }

    const teamId = await TeamService.findTeamByKey(team.key)
    const result = await UserService.joinTeam(user.id, teamId.id)

    if (result.error) {
        return next(result);
    }

    return res.json({message: "success", status: 200});
};

exports.joinTeam = async (req, res, next) => {
    const userInput = req.body
    const user = res.locals.user

    if (user.teamId != -1) {
        return next({message: "You already have team", status: 400})
    }
    if (!userInput.key) {
        return next({message: "All input is require", status: 400})
    }

    const team = await TeamService.findTeamByKey(userInput.key)

    if (team.error){
        return next(team)
    }

    const usersInTeam = UserService.findAllUserByTeamId(team.id)
    if (usersInTeam){
        if (usersInTeam.length == 3){
            return next({message: "This team is full", status: 400})
        }
    }

    const result = await UserService.joinTeam(user.id, team.id)
    if (result.error){
        return next(result)
    }

    return res.status(200).json({message: "Success", status: 200} )
};