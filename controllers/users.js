const models = require('../models');
const usersModel = require('../models/users');
const { DataTypes } = require('sequelize');
const users = usersModel(models.sequelize, DataTypes);
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV;
const config = require('../config/config')[env];
const passport = require('passport');
require('../config/passport')

exports.register = async (req, res, next) => {
    const userInput = req.body;
    if (!(userInput.firstname && userInput.lastname && userInput.email && userInput.password && userInput.confirmPassword)){
        return res.json({message: "All input is require"});
    };

    const result = users.createUser(userInput.firstname, userInput.lastname, userInput.email, userInput.password,'no' , 0, -1);
    result.then( async (message) => {
        return res.json(message);
    });
};

exports.login = async (req, res, next) => {
    const userInput = req.body;

    if (!(userInput.email && userInput.password)){
        return res.json({message: "All input is require", status: 400});
    };

    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err)

        if(user) {
            console.log(user)
            const token = jwt.sign(user, config.secret);
            return res.json({user, token});
        } else {
            return res.status(422).json(info);
        }
    
    })(req, res, next)
};

exports.profile = async (req, res, next) => {
    return res.json({message: 'Hello Sir', status: 200});
};