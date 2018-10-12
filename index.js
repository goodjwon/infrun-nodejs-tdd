const express = require('express');
const morgan = require('morgan');   //logger 용도
const bodyParser = require('body-parser');
const user = require('./api/user')
const app = express();

if (process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/users', user);

module.exports = app;
