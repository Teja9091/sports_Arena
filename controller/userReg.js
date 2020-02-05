const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userData = require('../dblogic/userdata')

router.post('/',userData);

module.exports = router;
