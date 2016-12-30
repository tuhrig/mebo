var _ = require('lodash');
var database = require('./../database/database.service.js');

/**
 * This function will return the message board with the requested
 * ID. If no such board exists, null will be returned.
 *
 * @param id The ID of the message board to return
 * @returns {*} The message board or null if not found
 */
function findBoard(id) {
    return database.findBoard(id);
}

/**
 * This function will check if a message board with the given ID already
 * exists or not. If so, it will return true. Otherwise false.
 *
 * @param id The ID of the message board to check
 * @returns {boolean} True if a board with the given ID exists
 */
function hasBoard(id) {
    return findBoard(id).then(function (board) {
        return !!board;
    });
}

function createBoard(id) {
    var board = {
        id: id,
        date: new Date(),
        messages: []
    };

    return database.saveBoard(board).then(function (b) {
        return board;
    });
}

function updateBoard(board) {
    return database.saveBoard(board).then(function (b) {
        return board;
    });
}


module.exports = {
    updateBoard: updateBoard,
    findBoard: findBoard,
    hasBoard: hasBoard,
    createBoard: createBoard
};