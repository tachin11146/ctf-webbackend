const express = require('express');
const path = require('path');
const user = require('../controllers/user')

const router = express.Router();

router.post('/postRegis', user.postRegis);

module.exports = router;
