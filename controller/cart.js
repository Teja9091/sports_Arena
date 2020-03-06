const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const User = require('../models/user');
const auth = require('../middleware/auth');
const Cart = require('../models/cart');
const cartService = require('../service/cart');

router.post('/cart/items', (req,res) => {
    cartService.addToCart(req.body).then((data)=> {
        res.status(200).json({data:data, message:'Cart has been succesfully created'});
        console.log('Cart created');
    })
    .catch((err)=> {
        res.status(400).json({err:err,message:'Unable to create cart'});
        console.log(err);
    });
});


module.exports = router;