const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login',async (req,res) => {

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    
    const validPassword = await bcrypt.compare(req.body.pwd, user.pwd);
    if(!validPassword) return res.status(400).json({message:'Invalid email or password'});

    let token =await user.generatingAuthToken();
    res.header('x-auth-token', token).send('login successfull');
    console.log(token);

});
/*
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
        console.log(e);
    }
});

*/

module.exports = router;
