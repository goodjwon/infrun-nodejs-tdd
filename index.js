const express = require('express');
const morgan = require('morgan');   //logger 용도
const app = express();

app.use(morgan('dev'));

let users = [
    {id: 1, name: 'goodjwon'},
    {id: 2, name: 'jw76park'},
    {id: 3, name: 'jwon76'}
]


app.get('/users', (req, res) => {
    res.json(users);
})

app.listen(3000, function () {
    console.log('server is running');
})

module.exports = app;
