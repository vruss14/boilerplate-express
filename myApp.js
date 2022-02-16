var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

console.log("Hello World");

app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({time: req.time})
})

app.get('/:word/echo', (req, res) => {
    res.send({echo: req.params.word})
})

app.get('/name', (req, res) => {
    res.send({name: `${req.query.first} ${req.query.last}`})
})

app.post('/name', (req, res) => {
    res.send({name: `${req.body.first} ${req.body.last}`})
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
    if(process.env.MESSAGE_STYLE === 'uppercase') {
      res.send({"message": "HELLO JSON"})
      
    } else {
      res.send({"message": "Hello json"})
    }
})



































 module.exports = app;
