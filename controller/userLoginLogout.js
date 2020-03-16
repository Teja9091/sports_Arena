const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login',async (req,res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invalid email or password');
        
        const validPassword = await bcrypt.compare(req.body.pwd, user.pwd);
        if(!validPassword) return res.status(400).json({message:'Invalid email or password'});
    
        const token =await user.generatingAuthToken();
        res.send({user, token})
    } catch (err) {
        res.status(400).send()
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send(200).json({message:"Logged out succesfully"})
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).json({message:"Logout successful"})
        console.error();
    } catch (e) {
        res.status(500).send()
    }
});


module.exports = router;
