/**
 * A MongoDB-based implementation of our database. This module will store
 * all data in a MongoDB. The data will be persistent. Use this module to
 * run the app for production.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var cfenv = require('cfenv');
var logger = require('log4js').getLogger("db");

// The usage of the default mongoose promise implementation is deprecated.
// It's recommended to add another promise implementation, what we are doing
// right here by using the "q" module.
//
// See: http://mongoosejs.com/docs/promises.html
mongoose.Promise = require('q').Promise;

/**
 * This function will configure the MongoDB database connection. It has two
 * ways of configuration:
 *
 *  - We can use a local MongoDB database. This is useful for development and
 *    very easy to setup.
 *  - We can use a MongoDB as a CloudFoundry service. This is used to run the
 *    app in production.
 *
 *  Note: The Cloud Foundry integration is only tested on IBM Bluemix!
 */
function config() {

    // We check the CloudFoundry credentials for our application. If we have
    // such credentials, we know that we are running on CloudFoundry (and not
    // local) and that we can connect to the Cloud Foundry database. However,
    // if we don't have any credentials, we use our local MongoDB instance to
    // run in "development mode".
    var cloudFoundryCredentials = getCloudFoundryCredentials();
    if(cloudFoundryCredentials) {

        console.log("Connect to CloudFoundry MongoDB: " + cloudFoundryCredentials.url);
        console.log("Connect as: " + cloudFoundryCredentials.username);

        mongoose.connect(cloudFoundryCredentials.url, {
                user: cloudFoundryCredentials.username,
                pass: cloudFoundryCredentials.password
        });
    } else {

        var mongoDbUrl = 'mongodb://localhost/mebo';
        console.log("Connect to local MongoDB: " + mongoDbUrl);
        mongoose.connect(mongoDbUrl);
    }
}

/**
 * This function will return a credentials object for our MongoDB in Cloud Foundry.
 * If such a service is not available (for example because we run the app locally
 * and not on Cloud Foundry) null will be returned.
 */
function getCloudFoundryCredentials() {
    var appenv = cfenv.getAppEnv();
    var services = appenv.services;
    if(_.isEmpty(services)) {
        return null;
    }
    var mongoDbService = services["mongodb"][0];
    return mongoDbService.credentials;
}

config();

var Schema = mongoose.Schema;

var Message = new Schema({
        id: {type: String, required: true},
        text: String,
        votes: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }
);

var BoardSchema = new Schema({
        id: {type: String, required: true},
        messages: [Message],
        date: {
            type: Date,
            default: Date.now
        }
    }
);

var Board = mongoose.model('Board', BoardSchema);

function saveBoard(board) {
    var boardEntity = new Board(board);
    return boardEntity.save().then(function (board) {
        if(board) {
            logger.info("Saved board with ID: " + board.id);
        } else {
            logger.warn("Cannot save board", board);
        }
        return board;
    });
}

function findBoard(id) {
    return Board.findOne({ id: id }).then(function (board) {
        if(board) {
            logger.info("Found board for ID: " + id);
        } else {
            logger.info("No board found for ID: " + id);
        }
        return board;
    });
}

module.exports = {
    saveBoard: saveBoard,
    findBoard: findBoard
};