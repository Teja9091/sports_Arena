const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User = require('../models/user');

const login = async (req,res) => {
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    
    const validPassword = await bcrypt.compare(req.body.pwd, user.pwd);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    jwt.sign({user},'privatekey',(err,token) => {
        console.log(token);
        res.send(token);
    });
  
};
/*
function verifyToken(req,res,next) {
    const bearerHeader = req.headers.authorization;

    if(bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    };
};
*/
module.exports = login;
