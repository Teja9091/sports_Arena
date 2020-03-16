const userDAO = require('../dao/user');


   exports.addToCart =  async (user,cartDetail) => {
        try{
            let condition ={};
            let updateFields ={};
            if(cartDetail == null){
                res.status(400).json({Error:"Error while updating product to cart"});
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

    exports.getAllCartItems = async (userDetail) => {
        try{
            if(userDetail == null){
                res.status(400).json({Error:"Error while updating product to cart"});
            }
            let condition = {};
            condition['_id'] = userDetail.id;
            const result = await userDAO.getAllCartItems({ _id: userDetail.id });

            const cart = result[0].cart;
            let totalPrice = cart.reduce((accumulator, currentValue, index) => {
                // const indTotal = (((currentValue.productId.price - (currentValue.productId.price * currentValue.productId.discount / 100)) 
                // * currentValue.qty) * 100 / 100);
                const indTotal = currentValue.productId.price * currentValue.qty;
                cart[index]['total'] = indTotal;
                return accumulator + currentValue.total;
            }, 0);
            return ({ cartItems: cart});


        } catch(error){
            res.status(400).json(error.message);
        }
    }
