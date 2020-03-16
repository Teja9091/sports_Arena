const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    // category:[{type: mongoose.Schema.Types.ObjectId, ref: 'Products Category'}],
    
    seller: [{type: mongoose.Schema.Types.ObjectId, ref: 'Seller'}],
    
});

module.exports = mongoose.model("Product",productSchema);

