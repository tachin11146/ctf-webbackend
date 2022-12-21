const models         = require('../models');
const teamsModel     = require('../models/teams');
const usersModel     = require('../models/users');
const {  DataTypes } = require('sequelize');
const teams          = teamsModel(models.sequelize, DataTypes);
const users          = usersModel(models.sequelize, DataTypes);
const jwt            = require('jsonwebtoken');
const env            = process.env.NODE_ENV;
const config         = require('../config/config')[env];
const service        = require('../services/users')
const userService    = new service(users, teams)
require('../config/passport')

exports.register = async (req, res, next) => {
    try {
        const userInput = req.body;
        if (!(userInput.firstname && userInput.lastname && userInput.email && userInput.password)){
            return next({message: "All input is require", status: 400});
        };
        
        const result = await userService.createUser(userInput.firstname, userInput.lastname, userInput.email, userInput.password);
        if (result.error){
            return next({message: result.message, status: 400})
        }

        return res.status(200).json({message: "Success", status: 200});
    } catch(err){
        return next(err)
    }
};

exports.login = async (req, res, next) => {
    const userInput = req.body;

    if (!(userInput.email && userInput.password)){
        return next({message: "All input is require", status: 400});
    };

    await userService.findUserByEmail(userInput.email).then( async (user) => {
        if (!user){
            return next({message: "email or password is incorrect", status: 400});
        }

        await userService.hashText(userInput.password).then( (password) => {
            if (user.password == password){
                const token = jwt.sign( {id: user.id, email: user.email}, config.secret );
                return res.status(200).json({message: "Success", token, status: 200});
            } else {
                return next({message: "email or password is incorrect", status: 400});
            }
        })
    });
};
