const Product = require('../models/products')
const mongoose = require('mongoose');
const addProduct = (req,res) => {
    let toCreate = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        seller: req.body.seller
    });
    Product.create(toCreate)
    .then(product => {
        res.status(200).json({
            data: product,
            message: 'Successfully created'
        })
    })
    .catch(error => {
        res.status(400).json({
            data: {},
            message: error.message
        })
    });
};


module.exports.addProduct = addProduct;
module.exports.Product = Product;