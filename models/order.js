const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: [
        {
            product: {type: mongoose.Schema.Types.ObjectId , ref: 'Product' , required: true},
            quantity: {type: Number , default: 1},
    
        }
    ],
    user: {
        name: {
          type: String,
          required: true
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        }
      }
});

module.exports = mongoose.model('Order',orderSchema);