const userModel = require('../models/user');


exports.addToCart = (condition,updateFields) =>{
   return userModel.updateOne(condition,updateFields);
}

exports.getById = (condition) => {
    return userModel.findOne(condition);
}

exports.getAllCartItems = (condition) => {
    return userModel.find(condition);
}