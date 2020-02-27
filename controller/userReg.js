const express = require('express');
const router = express.Router();
const userData= require('../service/userValidation');

router.post('/',userData);

module.exports = router;
