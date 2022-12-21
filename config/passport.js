const models        = require('../models');
const usersModel    = require('../models/users');
const { DataTypes } = require('sequelize');
const users         = usersModel(models.sequelize, DataTypes);
const passport      = require('passport')
const passportJWT   = require("passport-jwt")
const ExtractJWT    = passportJWT.ExtractJwt
const JWTStrategy   = passportJWT.Strategy
const LocalStrategy = require('passport-local').Strategy
const env           = process.env.NODE_ENV
const config        = require('./config')[env]

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.secret
    },
    (jwtPayload, cb) => {
        try {
            users.findUserByEmail(jwtPayload.email).then((result) => {
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