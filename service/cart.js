const cartModel = require('../models/cart');


const cartService = {
    async addToCart(cartDetail){async (req,res) => {
        try{
            if(cartDetail == null){
                return res.status(400).send(result.error.details[0].message);
            }
            const condition = {};

            condition._id = cartDetail.userId;
            condition['items.productId'] = cartDetail.items.productId;
            const productExists = await cartModel.add(condition);
            if(productExists){
            const condition = {};

            condition._id = cartDetail.userId;
            condition['items.productId'] = cartDetail.items.productId;
            let innCount = cartDetail.qty + productExists.cart[0].qty;
            if(innCount<0){
                return res.status.send({message:'CartDetail cannot be empty'});
            }else if(innCount == 0){
                condition={};
                condition_id = cartDetail.userId;
                updateFields = {
                    $pull: { "cart": { item: cartDetail.item}}
                }
            }else{
                updateFields = {
                    $inc: { "cart.$.qty":cartDetail.qty}
                }
            } 
            } else{
                condition = {};
                // properMessage = 'Item added to cart.';

                condition.userId = cartDetail.userId;
                updateFields = {
                    $push: { cart: cartDetail }
                };
                const result = await userDAO.addToCart(condition, updateFields);
                return result;
            }
        } catch(error) {
            return res.status(400).send(result.error.details[0].message);
        }
    }
    }
}

module.exports = cartService;