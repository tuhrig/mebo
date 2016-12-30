/**
 * A MongoDB-based implementation of our database. This module will store
 * all data in a MongoDB. The data will be persistent. Use this module to
 * run the app for production.
 */
var mongoose = require('mongoose');
var _ = require('lodash');

// The usage of the default mongoose promise implementation is deprecated.
// It's recommended to add another promise implementation, what we are doing
// right here by using the "q" module.
//
// See: http://mongoosejs.com/docs/promises.html
mongoose.Promise = require('q').Promise;





var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();

// Within the application environment (appenv) there's a services object
var services = appenv.services;

console.log("Services", services);
if(!_.isEmpty(services)) {



    var mongoDbService = services["mongodb"][0];

    console.log("MongoDB service", mongoDbService);
    console.log("Use MongoDB credentials", mongoDbService.credentials);
    console.log("Connect to CloudFoundry MongoDB: " + mongoDbService.credentials.url);
    console.log("Connect as: " + mongoDbService.credentials.username);

    mongoose.connect(mongoDbService.credentials.url, {
            user: mongoDbService.credentials.username,
            pass: mongoDbService.credentials.password
        }
    );

} else {

    var mongoDbUrl = 'mongodb://localhost/mebo';
    console.log("Connect to local MongoDB: " + mongoDbUrl);
    mongoose.connect(mongoDbUrl);
}




var Schema = mongoose.Schema;

var log4js = require('log4js');
var logger = log4js.getLogger("db");

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