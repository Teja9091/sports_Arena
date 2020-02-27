const express = require('express');
const router = express.Router();
const Category = require('../models/productCategories');

router.post('/', async (req,res) => {
    let category = await Category.findOne({productCategory:req.body.productCategory});
    if (category) {
        res.status(400).send('Category already exists');
    }else {
        category = new Category({
            productCategory: req.body.productCategory,
            description: req.body.description,
        });
    }
        await category.save();
        res.send(category);
});
 
router.get('/',async (req,res) => {
    const category = await Category.find();
    res.send(category);
});

router.put('/:categoryId',async (req,res) => {
    try{
        await Category.findByIdAndUpdate({_id:req.params.categoryId},req.body);
        const category = await Category.findOne({_id:req.params.categoryId});
        res.send(category);
    }catch(err) {
        res.status(400).json({message:"Incorrect Id or error while updating"});
        console.log(error);
    }
});

router.delete('/:categoryId',async (req,res) => {
    try{
        await Category.findByIdAndDelete({_id:req.params.categoryId});
        res.status(200).json({message:"Deleted Successfully"});
    }catch(err) {
        res.status(400).json({message:"Incorrect categoryId"});
        console.log(err);
    }
});

module.exports = router;