const express = require('express');
const path = require('path');
const team = require('../controllers/teams')
const passport = require('passport');
const router = express.Router();

require('../config/passport');

router.post('/createTeam', passport.authenticate('jwt', {session: false}), team.createTeam);

module.exports = router;
