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

    logger.info("Configure database connection of MongoDB");

    // We check the CloudFoundry credentials for our application. If we have
    // such credentials, we know that we are running on CloudFoundry (and not
    // local) and that we can connect to the Cloud Foundry database. However,
    // if we don't have any credentials, we use our local MongoDB instance to
    // run in "development mode".
    var cloudFoundryCredentials = getCloudFoundryCredentials();
    if(cloudFoundryCredentials) {

        logger.info("Connect to CloudFoundry MongoDB: " + cloudFoundryCredentials.url);
        logger.info("Connect as: " + cloudFoundryCredentials.username);

        mongoose.connect(cloudFoundryCredentials.url, {
                user: cloudFoundryCredentials.username,
                pass: cloudFoundryCredentials.password
        });
    } else {

        var mongoDbUrl = 'mongodb://localhost/mebo';
        logger.info("Connect to local MongoDB: " + mongoDbUrl);
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
        id: {type: String, unique : true, required: true},
        text: String,
        votes: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }
);

var BoardSchema = new Schema({
        id: {type: String, unique : true, required: true},
        messages: [Message],
        date: {
            type: Date,
            default: Date.now
        }
    }
);

var Board = mongoose.model('Board', BoardSchema);

function saveBoard(board) {

    // Note: I had a lot of trouble with this function. The main problem is that IBM
    // Bluemix (which I must use as my PaaS) used an old version of MongoDB (v. 2.4)
    // while the current version is something like 3.4. This old version of MongoDB
    // has a known bug (see: https://github.com/joegoldbeck/mongoose-encryption/issues/16).
    // This bug causes MongoDB to throw an error if an entity with "_id" is saved.
    // Instead we need to make an update. If IBM Bluemix would use the current version
    // of MongoDB we could simple use the later case and save an existing board just like
    // we save a new board.

    logger.debug("Saving board with ID: " + board.id);

    return Board.findOne({id: board.id}).then(function(foundBoard) {

        // We need to switch between two situations: The board might already exist, so
        // we will find it by its ID. In this case we update the messages and save the
        // board. However, if we don't find any board, the board simply doesn't exist
        // yet. In this case, we need to make a new board entity and save a new board
        // to MongoDB.

        if(foundBoard) {

            foundBoard.messages = board.messages;
            return foundBoard.save().then(function (board) {
                if(board) {
                    logger.info("Saved board with ID: " + board.id);
                } else {
                    logger.warn("Cannot save board", board);
                }
                return board;
            }, function (error) {
                logger.warn("Cannot save board", error);
            });

        } else {

            var boardEntity = new Board(board);
            return boardEntity.save().then(function (board) {
                if(board) {
                    logger.info("Created board with ID: " + board.id);
                } else {
                    logger.warn("Cannot create board", board);
                }
                return board;
            }, function (error) {
                logger.warn("Cannot create board", error);
            });
        }
    });
}

function findBoard(id) {

    logger.debug("Finding board with ID: " + id);

    return Board.findOne({ id: id }).then(function (board) {
        if(board) {
            logger.debug("Found board for ID: " + id);
        } else {
            logger.info("No board found for ID: " + id);
        }
        return board;
    }, function (error) {
        logger.warn("Cannot find board", error);
    });
}

module.exports = {
    saveBoard: saveBoard,
    findBoard: findBoard
};