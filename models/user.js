const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
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
    tokens: [{
        token: {
                type: String,
                required: true
            }
        }],
    cart:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            qty:{
                type: Number,
                default:1
            },
            total: Number
            
        }
    ]
        
});


userSchema.methods.generatingAuthToken =async function() { 
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'jwtPrivateKey')
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
};

exports.addToCart = (condition,updateFields) =>{
    return userSchema.updateOne(condition,updateFields);
 }

module.exports = mongoose.model("User",userSchema);
