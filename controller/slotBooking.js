const express = require('express');
const {slotBooking,SlotBooking} = require('../service/sBooking');
const router = express.Router();

router.post('/',slotBooking);
router.get('/',async (req,res) => {
    const bookings = await SlotBooking
    .find()
    .populate('slots');
    res.status(201).send(bookings);
})

module.exports = router;