const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const uLogin = require('../service/login');
const user = require('../models/user')

router.post('/',uLogin);
/* (req,res) => {
    jwt.sign({user},'privatekey',(err,token) => {
        console.log(token);
    });
});
*/

module.exports = router;
