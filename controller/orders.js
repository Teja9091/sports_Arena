const express = require('express');
const Order = require('../models/order');
const Product = require('../models/product');
const userDAO = require('../dao/user');
const addOrder = require('../service/order');
const router = express.Router();



// router.post('/',async (req,res) => {
//     try{
//         const product = await Product.findById({_id:req.query.productId});
//         if(!product) {
//             res.status(500).json({message:"Product not found"});
//             console.log(product);
//         }
//         const order = new Order({
//             _id: mongoose.Types.ObjectId(),
//             quantity: req.body.quantity,
//             product: req.body.productId
//         })
//         await order.save();
//         res.status(200).send(order).json({message:"Order placed"});
//     }catch(err) {
//         console.log(err);
//         res.status(500).json({message:"Error while placing order"});
//     }

// });


router.post('/add',addOrder.order);

module.exports = router;
