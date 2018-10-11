const express = require('express');
const morgan = require('morgan');   //logger 용도
const bodyParser = require('body-parser');
const user = require('./api/user')
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/users', user);



app.listen(3000, function () {
    console.log('server is running');
});

module.exports = app;
