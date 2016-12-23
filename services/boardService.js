var _ = require('lodash');

var log4js = require( "log4js" );
var logger = log4js.getLogger("boardService");

logger.info("Init boardService");

var boards = [];

function findOrCreateBoard(id) {

    var requestedBoard = null;
    _.forEach(boards, function (board) {
        if(board.id === id) {
            logger.info("Found existing board: [id="+ id + "]" );
            requestedBoard = board;
        }
    });

    if(requestedBoard === null) {
        logger.info("Create new board: [id="+ id + "]" );
        requestedBoard = {
            id: id,
            date: new Date()
        };
        boards.push(requestedBoard);
    }

    return requestedBoard;
}


module.exports = {
    findOrCreateBoard: findOrCreateBoard
};