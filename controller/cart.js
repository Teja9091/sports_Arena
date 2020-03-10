const express = require('express');
const Cart = require('../models/cart')
const router = express.Router();

router.post('/add',async (req,res) => {
    if(Cart.productId) {
        for(let i=1; i < Cart.productId.length; i++) {
            Cart.productId = Cart.productId.length
        }
    } else {
        try {
            let cart = new Cart({
                userId: req.body.userId,
                productId: req.body.productId,
                quantity: req.body.quantity
            });
                await cart.save();
                res.status(201).send(cart);
        } catch (err) {
            res.status(400).json({Error:"Error while updating cart to product"});
        }
    }
});
router.get('/',async (req,res) => {
    try {
        const products = await Cart.findOne({userId:req.query.userId})
        .populate('product user');
         res.status(200).send(products);
    } catch (err) {
        res.status(500).json({Error:"Incorrect userId or user doesnt have products in cart"});
        console.log(err);
    }
});

module.exports = router;

