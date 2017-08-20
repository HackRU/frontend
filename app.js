const express = require('express');
const ejs = require('ejs'); // Templating Engine
const app = express();

app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/dashboard', function (req, res) {
    res.render('dashboard.ejs');
});

app.get('/registration', function (req, res) {
    res.render('registration.ejs');
});


// Launch
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port: %d', port);