var express = require('express');
var fs = require('fs');
var logger = require( "log4js" ).getLogger("app");
var bodyParser = require('body-parser');

logger.info("..--##≤≤ ,,..--..,, >>##--..");
logger.info("..--##≤≤ Start MEBO >>##--..");
logger.info("..--##≤≤ ,,..--..,, >>##--..");

var app = express();

// Maps all files under /public to the root path of the application.
// So calling http://localhost:8080 will directly map to the index.html!
app.use("/", express.static(__dirname + "/public"));
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