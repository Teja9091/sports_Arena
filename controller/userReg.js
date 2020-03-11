const express = require('express');
const router = express.Router();
const userData= require('../service/userValidation');
const cartService = require('../service/cart');

router.post('/',userData);

router.put('/add',async (req,res) => {
    cartService.addToCart(req.query,req.body).then((result) =>{
        res.status(200).json({message:" Product added to cart", data: result});
    }).catch ((err) => {
        res.status(400).json({Error:"Error while updating cart to product"});
    });
});

module.exports = router;
