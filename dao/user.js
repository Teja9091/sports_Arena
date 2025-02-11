const userModel = require('../models/user');


exports.addToCart = (condition,updateFields) =>{
   return userModel.updateOne(condition,updateFields);
}

exports.getById = (condition) => {
    return userModel.findOne(condition);
}

exports.getAllCartItems = (id) => {
    return userModel.find(id)
    .populate({
        path : 'cart.productId',
        populate : ({
            path: 'seller category',
        })
    
    });
}

