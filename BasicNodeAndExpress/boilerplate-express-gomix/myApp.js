require('dotenv').config();
const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // res.send("Hello Express");
    // console.log(__dirname + '/views/index.html');
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
    console.log(process.env.MESSAGE_STYLE)
    let resText = "Hello json"
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        resText = resText.toUpperCase();
    }
    res.json({ "message": resText });
});


app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res, next) {
    res.json({ time: req.time });
});


// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word});
});



























module.exports = app;
