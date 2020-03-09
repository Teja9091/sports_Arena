const express = require('express');
const cart = require('../service/cart');
const router = express.Router();

router.put('/add', (req,res)=>{
    cart.addToCart(req.query,req.body).then((result) =>{
        res.status(200).json({message:'Item added to cart', data: result});
    }).catch((error) =>{
        res.status(400).json({message: error.message});
    })
});

router.get('/cart', (req,res)=>{
    cart.getAllCartItems(req.query).then((result) =>{
        res.status(200).json({message:'Cart result', data: result});
    }).catch((error) =>{
        res.status(400).json({message: error.message});
    })
});

module.exports = router;