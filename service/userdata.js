const Joi = require('joi');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/user');


function validateUser(userData) {
    const schema = {
        name: Joi.string().min(4).max(22).required(),
        userName: Joi.string().alphanum().min(4).max(22).required(),
        dob: Joi.string().min(8).max(10).required(),
        email: Joi.string().min(4).max(30).required().email(),
        mobile: Joi.string().min(10).max(10).required(),
        pwd: Joi.string().min(4).max(22).required(),
        //retypePwd: Joi.string().min(4).max(22).required(),
    }
    return Joi.validate(userData,schema , {abortEarly: false});
};

const uData =  (req,res) => {
    const result = validateUser(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    
    let pwd = req.body.pwd;
    //let retypePwd = req.body.retypePwd;
    return bcrypt.hash(pwd,10)
    .then(hashedPassword => {
        let toCreate = new User({
            name: req.body.name,
            userName: req.body.userName,
            dob: req.body.dob,
            email: req.body.email,
            mobile: req.body.mobile,
            pwd: hashedPassword,
        });
        User.create(toCreate)
        .then(user => {
            res.status(200).json({
                data: user,
                message: 'Successfully created'
            })
        })
        .catch(error => {
            res.status(400).json({
                data: {},
                message: error.message
            })
        })
        //return user.save();
    });
    //if (pwd === retypePwd) {
        
    //} else res.status(400).send("Passwords doesn't match");

    /*
    let user = new User(toCreate)
    //if(pwd === retypePwd) {
        user = await user.save();
        res.send(user);
        console.log(user);
    //} else console.log("Password entered doesnt match");
    */
  // if(toCreate.pwd === toCreate.retypePwd) {
  
    //bcrypt.hash(toCreate.pwd, saltRounds, function (err,hash) { 

    
   // });

    //} else res.status(400).send("Passwords doesn't match");

};

module.exports = uData;