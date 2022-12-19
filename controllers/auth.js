const   jwt = require('jsonwebtoken')
const   passport = require('passport')

exports.auth =  (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) return next(err)
        if(user) {
            const token = jwt.sign(user, 'your_jwt_secret')
            return res.json({user, token})
        } else {
            return res.status(422).json(info)
         }
    })(req, res, next);
};


