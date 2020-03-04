const Slot = require('../models/slots')
const mongoose = require('mongoose');
const addSlot = (req,res) => {
    let toCreate = new Slot({
        slotTime: req.body.slotTime,
        slotDate: req.body.slotDate,
        createdAt: req.body.createdAt,
    });
    Slot.create(toCreate)
    .then(slot => {
        res.status(200).json({
            data: slot,
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


module.exports.addSlot = addSlot;
module.exports.Slot = Slot;