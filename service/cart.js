const userDAO = require('../dao/cart-dao');

const cartService = { 
    async addToCart(user,cartDetail){
    try{
        let updateFields = {};
        if(cartDetail == null){
            return Promise.reject(res.status(400).json({message:'Enter credentials'}));
        }
        const condition = {};
        condition._id = user.id;
        condition['cart.productId'] = cartDetail[0].productId;
        let productExists = await userDAO.getCartItems(condition);
        if(productExists) {
        
           const inCount = cartDetail[0].qty + productExists.cart[0].qty;
           if(inCount < 1){
            return Promise.reject(res.status(400).json({message:'Enter credentials'}));
           } else{
               updateFields = {
                   $inc:{ 'cart.$.qty': cartDetail[0].qty}
               }
           }
        } else{
            const condition = {};
            condition._id = user.id;
            updateFields = {
                $push: {cart : cartDetail}
            }
        }
        const result = await userDAO.addToCart(condition,updateFields);
        return result;
    } catch(error) {
        return Promise.reject(res.status(400).error(error.message));            
    }
},

async getAllCartItems(userId) {
    try{
        if(userId == null){
            return Promise.reject(res.status(400).json({message:'Enter credentials'}));
        }
        const result = await userDAO.getAllCartItems({_id:userId.id});
        if(!result){
            return Promise.reject(res.status(400).json({message:'No product added'}));
        }
        let cart = result[0].cart;
        let cartResult = _.groupBy(cart);
        let totalPrice = 0;
        let expectedResult = [];

        for(let i in cartResult){
            let normalObj = {};
            cartResult[i].forEach(product => {
                product.amount = Math.round(((product.productId.price - (product.productId.price * product.productId.discount / 100)) * product.qty) * 100) / 100;
                totalPrice += product.amount;
            })
            normalObj.products = cartResult[i];
            expectedResult.push(normalObj);
        }
        totalPrice = Math.round(totalPrice * 100)/100;
        return ({cartItems: expectedResult, TotalPrice: totalPrice})

    }catch(error) {
        return Promise.reject(res.status(400).error(error.message));            
    }
}

};

module.exports = cartService;