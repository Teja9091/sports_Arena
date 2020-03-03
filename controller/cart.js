const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const userService = require('../service/userValidation');

router.post('/', (req, res, next) => {
    userService.addToCart(req.body,req.user).then(result => {
      if(result){
        console.log(result);
        res.redirect('/cart');
      } else {
        console.error();
      }
      });
  }); 

module.exports = router;