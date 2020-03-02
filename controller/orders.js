const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/products');

router.get('/',async (req,res,next) => {
    try{
        const order = await Order.find();
        res.status(200).json({
          count: order.length,
          orders: order.map(doc => {
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
            };
          })
        });
    }catch(err) {
        res.status(500).json({
          error: err
        });
      };
});
router.post('/',async (req,res) => {
    try{
        const product = await Product.findById({_id:req.query.productId});
        if(!product) {
            res.status(500).json({message:"Product not found"});
            console.log(product);
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        await order.save();
        res.status(200).send(order).json({message:"Order placed"});
    }catch(err) {
        console.log(err);
        res.status(500).json({message:"Error while placing order"});
    }

});

module.exports = router;
