var express = require('express');

var app = express();

app.use(express.static('client/'));

app.use('/viz', express.static('web-viz/'));

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);
