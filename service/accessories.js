const Product = require('../models/sAccessories')

const addProduct = (req,res) => {
    let toCreate = new Product({
        productName: req.body.productName,
        description: req.body.description,
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