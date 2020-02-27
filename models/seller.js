const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({

    seller: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
    
});

module.exports = mongoose.model("Seller",sellerSchema);

