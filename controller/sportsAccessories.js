const express = require('express');
const jwt = require('jsonwebtoken');
const {addProduct , Product} = require('../service/accessories');
const tokenAuth = require('../service/tokenAuth');
const auth = require('../middleware/auth');
const admin = require('../middleware/adminAuth');
const router = express.Router();



router.post('/', [auth,admin],addProduct);
router.get('/', async (req,res) => {
    const products = await Product.find();
    res.send(products)
});

module.exports = router;