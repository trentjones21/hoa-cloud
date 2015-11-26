var express = require('express');
var app = express();

// setup static directory
app.use(express.static('app'));

// start the server
var server = app.listen(3000, function() {

console.log("Started on port 3000");
var host = server.address().address;
var port = server.address().port;
});