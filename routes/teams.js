const express = require('express');
const path = require('path');
const team = require('../controllers/teams')

const router = express.Router();

router.post('/createTeam', team.createTeam);

module.exports = router;
