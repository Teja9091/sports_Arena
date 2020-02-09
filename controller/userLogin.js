const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const uLogin = require('../service/login');

router.post('/',uLogin);

module.exports = router;
