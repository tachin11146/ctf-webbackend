const express = require('express');
const path = require('path');
const user = require('../controllers/users')

const router = express.Router();

router.post('/register', user.register);
router.post('/login', user.login);

module.exports = router;
