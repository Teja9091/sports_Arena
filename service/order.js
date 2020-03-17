const userDAO = require('../dao/user');
const Order = require('../models/order');


exports.order = async function (req,res) {
    console.log("inside function");
    
    let userDetail = req.body;
    try{
        console.log("userDetail",userDetail);
        
        let condition = {};
        condition['_id'] = userDetail.userId;
        const result = await userDAO.getAllCartItems({ _id: userDetail.userId });

        const cart = result[0].cart;
        let totalPrice = cart.reduce((accumulator, currentValue, index) => {
            const indTotal = currentValue.productId.price * currentValue.qty;
            cart[index]['total'] = indTotal;
            return accumulator + currentValue.total;
        }, 0);
        const products = cart.map(i=> {
            return {qty:i.qty, product:i.productId};
        });
        const order = await new Order({
            user: {
                name: userDetail.name,
                userId: userDetail.userId
            },
            products: products
        });
        await order.save();
        res.status(201).send(order);


    } catch(error){
        res.status(400).json(error.message);
    }
}