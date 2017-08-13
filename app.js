const express = require('express');
const ejs = require('ejs'); // Templating Engine
const app = express();

app.get('/testejs', function (req, res) {
    res.render('testejs.ejs');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


// Launch
var port = process.env.PORT || 8080; // Determine Port to listen on
app.listen(port);
console.log('Listening on port: %d', port);