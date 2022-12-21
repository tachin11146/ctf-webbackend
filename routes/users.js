const express = require('express');
const user    = require('../controllers/users');
const router  = express.Router();

require('../config/passport');

router.post('/register', user.register);
router.post('/login', user.login);

module.exports = router;
