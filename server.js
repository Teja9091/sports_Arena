const express = require('express');
const mongoose = require('mongoose');
const users = require('./controller/userReg');
const app = express();

mongoose.connect('mongodb://localhost/sports_Arena')
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Connection failed'));

app.use('/user/register', users);

app.listen(2020, () => console.log('Listening on port 2020'));