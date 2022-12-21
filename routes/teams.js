const express  = require('express');
const team     = require('../controllers/teams')
const router   = express.Router();
const auth     =  require('../controllers/auth')

require('../config/passport');

router.post('/createTeam', auth, team.createTeam);
router.post('/joinTeam', auth, team.joinTeam);

module.exports = router;
