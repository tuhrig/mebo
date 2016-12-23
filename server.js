var express = require('express');
var app = express();
var logger = require('morgan');
var fs = require('fs');


var log4js = require( "log4js" );
var logger = log4js.getLogger("app");
logger.info("..--##≤≤ Start MEBO >>##--..");

// app.use(logger('combined'))


//setting middleware
app.use(express.static(__dirname)); //Serves resources from public folder

var board = require('./routes/board.js');

app.use('/api', board);

var server = app.listen(5000);
logger.info("Running on port 5000");