const express = require('express');
const {addSlot , Slot} = require('../service/addSlot');
const router = express.Router();

router.post('/',addSlot);

module.exports = router;