const models = require('../models');
const usersModel = require('../models/users');
const { DataTypes } = require('sequelize');
const users = usersModel(models.sequelize, DataTypes);
const passport = require('passport')
const passportJWT   = require("passport-jwt")
const ExtractJWT    = passportJWT.ExtractJwt
const JWTStrategy   = passportJWT.Strategy
const LocalStrategy = require('passport-local').Strategy
const env = process.env.NODE_ENV
const config = require('./config')[env]

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {    
        users.loginUser(email, password).then((result) => {
            if (result){
                return cb(null, {email: email}, {message: 'Logged In Successfully'})
            } else {
                return cb(null, false, {message: 'Incorrect email or password.'})
            }
        });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.secret
    },
    (jwtPayload, cb) => {
        try {
        // find the user in db if needed
        users.findUser(jwtPayload.email).then((result) => {
            console.log(jwtPayload.email)
            console.log(result)
            if(jwtPayload.email == result.email) {
                return cb(null, result);
            } else {
                return cb(null, false);
            }
        });
        } catch (error) {
        return cb(error, false);
        }
    }
));