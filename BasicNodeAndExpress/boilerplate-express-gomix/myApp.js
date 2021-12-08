require('dotenv').config();
const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
})

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // res.send("Hello Express");
    // console.log(__dirname + '/views/index.html');
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res) => {
    console.log(process.env.MESSAGE_STYLE)
    let resText = "Hello json"
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        resText = resText.toUpperCase();
    }
    res.json({ "message": resText });
})

































module.exports = app;
