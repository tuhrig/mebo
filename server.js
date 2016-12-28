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

// VCAP_APP_PORT is a Cloud Foundry environment variable. It's used when
// the app is deployed to a Cloud Foundry server, for example in IBM Bluemix.
// If it's not set, we use the default port 8080, e.g. for our local system
// during development.
var port = process.env.VCAP_APP_PORT || 8080;
var server = app.listen(port);

logger.info("Running on port " + port);

module.exports = app;