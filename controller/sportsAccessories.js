const express = require('express');
const accessories = require('../service/accessories');
const router = express.Router();

router.post('/', accessories.addProduct);
router.get('/', async (req,res) => {
    const products = await accessories.Product.find();
    res.send(products)
});

module.exports = router;