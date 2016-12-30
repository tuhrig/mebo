var mongoose = require('mongoose');
var q = require('q');

if(!process.env.TEST) {


    mongoose.connect('mongodb://localhost/test');
    var Schema = mongoose.Schema;
    mongoose.Promise = require('q').Promise;
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


} else {
    console.log("Don't connect to MongoDB as tests are runned: " + process.env.TEST);

    var boards = {};

    function saveBoard(board) {
        boards[board.id] = board;

        var deferred = q.defer();
        deferred.resolve(board);
        return deferred.promise;
    }

    function findBoard(id) {
        var deferred = q.defer();
        var board = boards[id] || null;
        deferred.resolve(board);
        return deferred.promise;
    }

    module.exports = {
        saveBoard: saveBoard,
        findBoard: findBoard
    };

    module.exports = {
        saveBoard: saveBoard,
        findBoard: findBoard
    };
}

