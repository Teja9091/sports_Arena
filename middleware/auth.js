const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token').replace('Bearer ', '');
    const decoded = jwt.verify(token,'jwtPrivateKey');
    const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
    
    if(!user) {
      throw new Error()
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({Error:'Please login.'});
  }
}

module.exports = auth;