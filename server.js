const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/sports_Arena')
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Connection failed'));

app.listen(2020, () => console.log('Listening on port 2020'));