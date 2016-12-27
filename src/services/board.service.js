var _ = require('lodash');
var idGenerator = require('./id-generation.service.js');
var log4js = require( "log4js" );
var logger = log4js.getLogger("board.service");

logger.info("Init boardService");

// TODO Replace this memory based implementation with a MongoDB!
var boards = [];

/**
 * This function will return the message board with the requested
 * ID. If no such board exists, null will be returned.
 *
 * @param id The ID of the message board to return
 * @returns {*} The message board or null if not found
 */
function findBoard(id) {
    var requestedBoard = null;
    _.forEach(boards, function (board) {
        if(board.id === id) {
            logger.info("Found board: [id="+ id + "]" );
            requestedBoard = board;
        }
    });
    return requestedBoard;
}

/**
 * This function will check if a message board with the given ID already
 * exists or not. If so, it will return true. Otherwise false.
 *
 * @param id The ID of the message board to check
 * @returns {boolean} True if a board with the given ID exists
 */
function hasBoard(id) {
    return !!findBoard(id);
}

/**
 * This function will return all messages of a board. If no such board
 * exists, null will be returned. Note that the messages might be empty,
 * so an empty array will be returned (length === 0).
 *
 * @param id The ID of the message board
 * @returns {*} The messages or null if no board found
 */
function findMessages(id) {
    var board = findBoard(id);
    if(board) {
        return board.messages;
    }
    return null;
}

function findMessage(boardId, messageId) {
    var board = find(boardId);
    var requestedMessage = null;
    if(board) {
        var messages = board.messages;
        _.forEach(messages, function (message) {
            if(message.id === messageId) {
                logger.info("Found message: [id="+ messageId + "]" );
                requestedMessage = message;
            }
        });
    }
    return requestedMessage;
}

function createBoard(id) {
    logger.info("Create new board: [id="+ id + "]" );
    var board = {
        id: id,
        date: new Date(),
        messages: []
    };
    boards.push(board);
    return board;
}

/**
 * This function will create a new message on the given message
 * board. The message will contain the text as well as a creation
 * date. The updated message board will be returned. If the no
 * board with the given ID is found, null will be returned.
 *
 * @param id The ID of the message board
 * @param text The text message
 * @returns {*} The updated message board
 */
function createMessage(id, text) {
    logger.info("Add new message to board: [id="+ id + "]" );
    var board = findBoard(id);

    if(board) {

        var message = {
            text: text,
            date: new Date(),
            votes: 0,
            id: idGenerator.generateId()
        };

        board.messages.push(message);
        return message;
    }
    return null;
}

module.exports = {
    findBoard: findBoard,
    hasBoard: hasBoard,
    findMessages: findMessages,
    createBoard: createBoard,
    createMessage: createMessage
};