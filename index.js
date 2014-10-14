var express = require('express');
var server = express();
var fs = require('fs'); // include fs moodule for serving HTML page
var port = 3001;

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


// Student request
server.get('/thumb', function(req, res){ // listen for this get ( '/' ) request, and send data
  console.log("inside THUMB request");
  console.log(JSON.stringify(audioContext));

  res.send(audioContext); // CHANGE this to async later???
});


server.get('/destination', function(req, res){ // listen for this get ( '/' ) request, and send data
  console.log(req);
  console.log("inside destination request");
  // res.send( fs.readFileSync('./index.html') );
  // res.send(audioContext); // CHANGE this to async later???
  res.end(audioContext); // CHANGE this to async later???
});

// req.ip // returns IP address 
// req.path // returns path

server.listen(port);
console.log("Server is listening on port ", port);