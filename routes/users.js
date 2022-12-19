const express = require('express');
const path = require('path');
const user = require('../controllers/users');
const passport = require('passport');
const router = express.Router();

require('../config/passport');

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/profile', passport.authenticate('jwt', {session: false}), user.profile)
module.exports = router;
