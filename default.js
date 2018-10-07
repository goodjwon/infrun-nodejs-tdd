const express = require('express');
const morgan = require('morgan');   //logger 용도
const app = express();

/**
 * 3개의 파라미터가 존재 해야 미들웨어 이다.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function logger(req, res, next) { // is middleware
    console.log('i am logger');
    next(); //next 가 없으면 다음 미들웨어가 실행 되지 않는다.
}

//일반미들웨어 req, res, next
function logger2(req, res, next) {
    console.log('i am logger2');
    next(new Error('error ouccered'));
}

//에러미들웨어 err. req, res, next
function errormw(err, req, res, next) {
    console.log('iam err mw');
    console.log(err);
    //적절히 에러를 처리
    next();
}


app.use(logger);
app.use(logger2);
app.use(errormw);
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('Hello World')
});


app.listen(3000, function () {
    console.log('server is running');
})