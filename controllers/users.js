const models = require('../models');
const usersModel = require('../models/users');
const { DataTypes } = require('sequelize');
const users = usersModel(models.sequelize, DataTypes);

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

    users.loginUser(userInput.email, userInput.password).then((result) => {
        return res.json(result);
    });
};
