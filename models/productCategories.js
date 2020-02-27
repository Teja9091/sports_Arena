const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    productCategory: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Products Category",categorySchema);

