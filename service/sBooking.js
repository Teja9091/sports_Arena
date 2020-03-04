const mongoose = require('mongoose');
const SlotBooking = require('../models/slotBookings');

const slotBooking = (req,res) => {
    let toCreate = new SlotBooking({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        slots: req.body.slots,
    });
    SlotBooking.create(toCreate)
    .then(slotBooking => {
        res.status(200).json({
            data: slotBooking,
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

module.exports.slotBooking = slotBooking;
module.exports.SlotBooking = SlotBooking;