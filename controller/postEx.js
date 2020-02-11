const express = require('express');
const jwt = require('jsonwebtoken');
const tokenValidation = require('../service/login');
const router = express.Router();

function verifyToken(req,res,next) {
    const bearerHeader = req.headers.authorization;

    if(bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    };
};
router.post('/', verifyToken ,(req,res) => {
    jwt.verify(req.token, 'privatekey', (err,data) => {
        if(err) {
            res.sendStatus(403);
        }else {
            res.json({
                message: "Token authentication working fine",
                data
            });
        }
    });

});

module.exports = router