const mongoose = require('mongoose');
const slotSchema = mongoose.Schema({
    slotTime : {
        type: String,
        required: true
    },
    slotDate : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Slot",slotSchema);