const express = require('express');
const mongoose = require('mongoose');
const userss = require('./controller/userReg');
const app = express();

mongoose.connect('mongodb://localhost/sports_Arena')
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Connection failed'));

app.use(express.json());
app.use('/register', userss);

app.listen(2024, () => console.log('Listening on port 2024'));