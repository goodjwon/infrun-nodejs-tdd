const express = require('express');
const morgan = require('morgan');   //logger 용도
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

let users = [
    {id: 1, name: 'goodjwon'},
    {id: 2, name: 'jw76park'},
    {id: 3, name: 'jwon76'}
]


app.get('/users', (req, res) => {
    // limit 가 넘오 오지 않으면 10을 기본으로 설정한다.
    req.query.limit = req.query.limit || 10;

    // 문자로 넘어온 limit 값을 숫자로 변환 한다.
    const limit = parseInt(req.query.limit, 10);

    // 숫자로 넘어오지 않으면 400을 응답값으로 돌려 주고 종료 한다.
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    // 결과 값을 json 으로 응답한다.
    res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();

    res.json(user)
});


app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id);
    res.status(204).end();

});

app.post('/users', (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    const userNameDublicationCheck = users.filter(user => user.name === name).length > 0
    if (userNameDublicationCheck) return res.status(409).end();


    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();

    const isConceit = users.filter(user => user.name === name).length > 0;
    if (isConceit) return res.status(409).end();

    user.name = name;

    res.json(user);
});

app.listen(3000, function () {
    console.log('server is running');
});

module.exports = app;
