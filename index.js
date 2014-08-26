var express = require('express');
var server = express();
var fs = require('fs'); // include fs moodule for serving HTML page

server.use(express.static(__dirname));

server.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// express server
server.get('/', function(req, res){ // listen for this get ( '/' ) request, and send data
  console.log("inside GET request");
  // res.send( fs.readFileSync('./index.html') );
  res.end( fs.readFileSync('./index.html') ); // CHANGE this to async later???
});

server.listen(3000);
console.log("Server is listening on port 3000");