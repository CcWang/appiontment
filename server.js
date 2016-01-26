var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./client')));
app.set('views', path.join(__dirname,'./client'));

require("./server/config/mongoose.js");
require('./server/config/routes.js')(app);

app.listen(8000,function () {
  console.log("listening on port 8000, MEAN_Black_Belt");
})