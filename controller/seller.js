const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');
const auth = require('../middleware/auth');

router.post('/', async (req,res) => {
    let seller = await Seller.findOne({seller:req.body.seller});
    if (seller) {
        res.status(400).send('Seller already exists');
    }else {
        seller = new Seller({
            seller: req.body.seller,
            address: req.body.address,
        });
    }
        await seller.save();
        res.send(seller);
});

router.get('/',auth, async (req,res) => {
    const sellers = await Seller.find();
    res.send(sellers);
});

router.get('/:sellerId',async (req,res) => {
    try{
        const seller = await Seller.findById({_id:req.params.sellerId});
        res.send(seller);
    }catch(err) {
        res.status(400).json({message:"Incorrect sellerId"});
        console.log(err);
    }
});

router.put('/:sellerId',async (req,res) => {
    try{
        await Seller.findByIdAndUpdate({_id:req.params.sellerId},req.body);
        const seller = await Seller.findOne({_id:req.params.sellerId});
        res.send(seller);
    }catch(err) {
        res.status(400).json({message:"Incorrect sellerId"});
        console.log(err);
    }
});

router.delete('/:sellerId',async (req,res) => {
    try{
        await Seller.findByIdAndDelete({_id:req.params.sellerId});
        res.status(200).json({message:"Deleted successfully"});
    }catch(err) {
        res.status(400).json({message:"Incorrect sellerId"});
    }
});
module.exports = router;