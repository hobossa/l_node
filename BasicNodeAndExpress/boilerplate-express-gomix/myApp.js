require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

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


// route parameters
// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word });
});


// query parameters
// route_path: '/library'
// actual_request_URL: '/library?userId=546&bookId=6754'
// req.query: {userId: '546', bookId: '6754'}
// ?first=firstname&last=lastname
app.get('/name', (req, res) => {
    // fullname = req.query.first + ' ' + req.query.last;
    // res.json({name: fullname});
    // destructure and rename the keys
    const { first: firstName, last: lastName } = req.query;
    // use template literals fo form a formatted string
    res.json({ name: `${firstName} ${lastName}` });
});


// raw content of an HTTP POST request:
// POST /path/subpath HTTP/1.0
// From: john@example.com
// User-Agent: someBrowser/1.0
// Content-Type: application/x-www-form-urlencoded
// Content-Length: 20

// name=John+Doe&age=25

// route: POST '/library'
// urlencoded_body: userId=546&bookId=6754
// req.body: {userId: '546', bookId: '6754'}
app.post('/name', (req, res) => {
    const { first: firstName, last: lastName } = req.body;
    res.json({ name: `${firstName} ${lastName}` });
});



// If you want, you can use the method 
// app.route(path).get(handler).post(handler). 
// This syntax allows you to chain different verb handlers 
// on the same path route. You can save a bit of typing, 
// and have cleaner code.
// app.route('/name').get((req, res) => {
//
// }).post((req, res) => {
//
// });















module.exports = app;
