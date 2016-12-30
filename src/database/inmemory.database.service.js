var q = require('q');

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