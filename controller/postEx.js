const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../service/tokenAuth');
const router = express.Router();

router.post('/' , verifyToken, (req,res) => {
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