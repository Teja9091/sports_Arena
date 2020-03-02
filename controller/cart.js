const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router.post('/', (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then(product => {
        return req.user.addToCart(product);
      })
      .then(result => {
        console.log(result);
        res.redirect('/cart');
      });
  }); 

module.exports = router;