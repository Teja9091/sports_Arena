const mongoose = require('mongoose');
const slotBookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    slots: [{type: mongoose.Schema.Types.ObjectId, ref: 'Slot'}],
    bookedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SlotBooking",slotBookingSchema);