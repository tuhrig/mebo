/**
 * An in-memory implementation of our database. This module will store
 * all data in a JavaScript object. All data will vanish after execution.
 * Use this module for local development and unit tests.
 */
var q = require('q');

// All data is stored in this local variable!
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