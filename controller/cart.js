const express = require('express');
const Cart = require('../models/cart');
const cartService = require('../service/cart');
const router = express.Router();

router.put('/:userId&:productId',async (req,res) => {
    try {
        const product = await Cart.findOneAndUpdate({userId:req.params.userId,productId:req.params.productId},req.body);
        res.status(201).send(product);
    } catch (err) {
        res.status(500).json({Error:"Update failed"});
    }
});
// router.put('/add',async (req,res) => {
//     cartService.addToCart(req.query,req.body).then((result) =>{
//         res.status(200).json({message:" Product added to cart", data: result});
//     }).catch ((err) => {
//         res.status(400).json({Error:"Error while updating cart to product"});
//     });
// });
router.get('/:userId',async (req,res) => {
    try {
        const products = await Cart.findOne({userId:req.params.userId})
        .populate('product user');
         res.status(200).send(products);
    } catch (err) {
        res.status(500).json({Error:"Incorrect userId or user doesnt have products in cart"});
        console.log(err);
    }
});

module.exports = router;

