const models = require('../models')
const users = require('../models/users')
const { DataTypes } = require('sequelize')
exports.postRegis = async (req, res, next) => {
    var userInput = req.body;
    const user = users(models.sequelize, DataTypes)

    const result = user.create_user(userInput.first_name, userInput.last_name, userInput.email, userInput.password,'no' , 0, -1);
    // console.log(user.first_name)
    // if ( !( user.first_name && user.last_name && user.email && user.password ) ){
    //     return res.json({message: "All input is require", status: 400});
    // }

    // const result = users.createUser(user.first_name, user.last_name,  user.email, user.password);
    
    return res.json({status: 200});
}