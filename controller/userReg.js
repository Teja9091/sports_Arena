const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userData= require('../service/userdata');
const uLogin = require('../service/login');

router.post('/',userData);
router.post('/',uLogin);

module.exports = router;
