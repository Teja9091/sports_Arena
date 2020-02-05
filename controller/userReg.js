const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/userRegistration')

router.post('/', async (req,res) => {
    let user = new User({
        name: req.body.name,
        userName: req.body.userName,
        dob: req.body.dob,
        email: req.body.email,
        mobile: req.body.mobile,
        pwd: req.body.pwd,
        retypePwd: req.body.retypePwd
    });
    user = await user.save();
    res.send(user);
    console.log(user);
});

module.exports = router;
