const mongoose = require('mongoose');
const slotBookingSchema = mongoose.Schema({
    slots: [{type: mongoose.Schema.Types.ObjectId, ref: 'Slot'}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    bookedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SlotBooking",slotBookingSchema);