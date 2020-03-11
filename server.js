const express = require('express');
const mongoose = require('mongoose');
const config = require('config.json');
const users = require('./controller/userReg');
const uLogin = require('./controller/userLoginLogout');
const seller = require('./controller/seller');
const pCategories = require('./controller/categories');
const products = require('./controller/products');
//const order = require('./controller/orders');
const cart = require('./controller/cart');
const slot = require('./controller/slot');
const slotBooking = require('./controller/slotBooking');
const app = express();
/////server///////
mongoose.connect('mongodb://localhost/sports_Arena')
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Connection failed'));

app.use(express.json());
app.use('/register', users);
app.use('/',uLogin);
app.use('/seller',seller);
app.use('/pCategories',pCategories);
app.use('/products', products);
app.use('/slot', slot);
app.use('/slotBooking', slotBooking);
app.use('/cart',cart);
//app.use('/order',order);



app.listen(2024, () => console.log('Listening on port 2024'));