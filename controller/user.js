const express = require('express');
const router = express.Router();
const userData= require('../service/userValidation');
const cartService = require('../service/cart');
const auth = require('../middleware/auth');

router.post('/register',userData);

router.put('/add',async (req,res) => {
    cartService.addToCart(req.query,req.body).then((result) =>{
        res.status(200).json({message:" Product added to cart", data: result});
    }).catch ((err) => {
        res.status(400).json({Error:"Error while updating cart to product"});
    });
});
router.get('/cart', cartService.getCart);
router.post('/order');

module.exports = router;
