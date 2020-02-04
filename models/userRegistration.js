const mongoose = require('mongoose');

const user = mongoose.model('RegisteredUsers', new mongoose.Schema({
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
        minlength: 6,
        maxlength: 15
    },
    retypePwd: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15
    }
    
}));

exports.user = user;