const express = require('express');
const path = require('path');
const app = express();
const cookies = require('cookie-parser');

app.use(cookies());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  console.log(req.cookies);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(9000);
