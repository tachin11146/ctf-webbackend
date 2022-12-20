const models = require('../models');
const teamsModel = require('../models/teams');
const usersModel = require('../models/users');
const {  DataTypes } = require('sequelize');
const teams = teamsModel(models.sequelize, DataTypes);
const users = usersModel(models.sequelize, DataTypes);
const passport = require('passport');
require('../config/passport');

exports.createTeam = async (req, res, next) => {
    const userInput = req.body
    if (!(userInput.name)){
        return res.json({message: "All input is require", status: 400})
    };

    await passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (err) return next(err)
        if (user){
            const result = await teams.createTeam(user.id, userInput.name)
            .then( async (result) => {
                console.log(result)
                if (result.status == 400){
                    return res.json(result)
                } 
                await users.joinTeam(user.id, result.teamId)
                .then( (result) => {
                    return res.json(result)
                })
            })
        };
    
    })(req, res, next)
};

