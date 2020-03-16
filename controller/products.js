const express = require('express');
const jwt = require('jsonwebtoken');
const {addProduct , Product} = require('../service/products');
const Category = require('../models/productCategories');
const tokenAuth = require('../service/tokenAuth');
const auth = require('../middleware/auth');
const admin = require('../middleware/adminAuth');
const router = express.Router();



router.post('/addProduct', addProduct);

router.get('/', async (req,res) => {
    const products = await Product
    .find()
    .populate('category seller');
    res.send(products);
});

router.get('/',async (req,res) => {
    const products = await Product.find();
    res.send(products);
});

router.get('/:productId',async (req,res) => {
    try{
    const id = req.params.productId;
    const product = await Product.findById(id)
    .populate('category seller');
    res.send(product);
    } catch(err) {
        res.status(400).json({message:"Incorrect productId"});
        console.log(err);
    }
});

router.put('/:productId',async (req,res) => {
    try{
        await Product.findByIdAndUpdate({_id:req.params.productId},req.body);
        const product = await Product.findOne({_id:req.params.productId});
        res.send(product);
    
    } catch(err) {
        res.status(400).json({message:"Something went wrong"});
    }
});

router.delete('/:productId',async (req,res) => {
    try{
        await Product.findByIdAndDelete({_id:req.params.productId});
        res.status(200).json({message:"Deleted successfully"});
    }catch(err) {
        res.status(400).json({message:"Error while deleting product"});
        console.log(err);
    }
});

module.exports = router;