const jwt = require('jsonwebtoken');
const tokenValidation = require('./login');



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

module.exports = verifyToken;