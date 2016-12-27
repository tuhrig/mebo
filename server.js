var express = require('express');
var fs = require('fs');
var log4js = require( "log4js" );
var bodyParser = require('body-parser');

var logger = log4js.getLogger("app");

logger.info("..--##≤≤ ,,..--..,, >>##--..");
logger.info("..--##≤≤ Start MEBO >>##--..");
logger.info("..--##≤≤ ,,..--..,, >>##--..");

var app = express();
app.use(express.static(__dirname)); //Serves resources from public folder
app.use(bodyParser.json());

var boardRouter = require('./src/routes/board.router.js');
var messageRouter = require('./src/routes/message.router.js');

app.use('/api', boardRouter);
app.use('/api', messageRouter);

var server = app.listen(5000);
logger.info("Running on port 5000");

module.exports = app;