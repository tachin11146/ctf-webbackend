const passport = require('passport');
require('../config/passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (err) return next(err)
        if (user){
            res.locals.user = user
            next()
        }
    })(req, res, next)
}

