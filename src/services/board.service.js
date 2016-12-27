var _ = require('lodash');

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
    return _.find(boards, {id: id}) || null;
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

function createBoard(id) {
    var board = {
        id: id,
        date: new Date(),
        messages: []
    };
    boards.push(board);
    return board;
}

function clear() {
    boards = [];
}

module.exports = {
    findBoard: findBoard,
    hasBoard: hasBoard,
    createBoard: createBoard,
    clear: clear // only for tests!
};