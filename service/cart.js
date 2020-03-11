const userDAO = require('../dao/user');


const cartService = {
    async addToCart(user,cartDetail){
        try{
            let condition ={};
            let updateFields ={};
            if(cartDetail == null){
                res.status(400).json({Error:"Error while updating cart to product"});
            }
            condition['_id'] = user.id;
            condition['cart.productId'] = cartDetail[0].productId;
            const productExists = await userDAO.getById(condition);
                if(productExists){
                    const innCount = cartDetail[0].qty + productExists.cart[0].qty;
                    if(innCount < 1){
                        res.status(400).json({Error:"Cart Detail cannot be empty"});
                    } else{
                        updateFields = {
                            $inc: { 'cart.$.qty': cartDetail[0].qty }
                        }
                    }
                } else{
                    condition={};
                    condition['_id'] = user.id;
                    updateFields={
                        $push:{ cart: cartDetail}
                    }
                }
            const result = await userDAO.addToCart(condition,updateFields);
            return result;
        } catch(error){
            res.status(400).json(error.message);
        }
    }
};

module.exports = cartService;