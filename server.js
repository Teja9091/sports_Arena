const express = require('express');
const mongoose = require('mongoose');
const config = require('config.json');
const users = require('./controller/userReg');
const uLogin = require('./controller/userLoginLogout');
const seller = require('./controller/seller');
const pCategories = require('./controller/categories');
const products = require('./controller/products');
const app = express();

mongoose.connect('mongodb://localhost/sports_Arena')
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Connection failed'));

app.use(express.json());
app.use('/register', users);
app.use(uLogin);
app.use('/seller',seller);
app.use('/pCategories',pCategories);
app.use('/products', products);


app.listen(2024, () => console.log('Listening on port 2024'));