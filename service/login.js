const bcrypt = require('bcryptjs');
const  User = require('../models/user');

const auth = async (req,res) => {
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');
    
    const validPassword = await bcrypt.compare(req.body.pwd, user.pwd);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    res.send('Successfully logged-in');
};

module.exports = auth;
