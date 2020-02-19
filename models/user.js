const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
         minlength: 4
        },
    userName: { 
        type: String, 
        required: true, 
        minlength: 4, 
        maxlength: 10, 
        unique: true 
        },
    dob: { 
        type: String,
        required: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true
        },
    mobile: { 
        type: String, 
        required: true, 
        unique: true, 
        minlength: 10, 
        maxlength: 10 
        },
    pwd: { 
        type: String, 
        required: true, 
        minlength: 6 
        },
    isAdmin: Boolean,
    tokens: [{
            token: {
                type: String,
            }
        }]
     
});
userSchema.methods.generatingAuthToken =async function() { 
    const user = this;
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin },'jwtPrivateKey');
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
module.exports = mongoose.model("User",userSchema);
