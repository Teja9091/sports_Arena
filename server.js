const express = require('express');
const mongoose = require('mongoose');
const users = require('./controller/userReg');
const uLogin = require('./controller/userLogin');
const app = express();

mongoose.connect('mongodb://localhost/sports_Arena')
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Connection failed'));

app.use(express.json());
app.use('/register', users);
app.use('/login', uLogin);

app.listen(2024, () => console.log('Listening on port 2024'));