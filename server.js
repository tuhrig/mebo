var express = require('express');
var fs = require('fs');
var log4js = require( "log4js" );
var logger = log4js.getLogger("app");

logger.info("..--##≤≤ ,,..--..,, >>##--..");
logger.info("..--##≤≤ Start MEBO >>##--..");
logger.info("..--##≤≤ ,,..--..,, >>##--..");

var app = express();
app.use(express.static(__dirname)); //Serves resources from public folder

var boardRouter = require('./routes/boardRouter.js');
var messageRouter = require('./routes/messageRouter.js');

app.use('/api', boardRouter);
app.use('/api', messageRouter);

var server = app.listen(5000);
logger.info("Running on port 5000");


module.exports = app;