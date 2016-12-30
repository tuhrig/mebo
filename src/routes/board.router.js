var express = require('express');
var boardService = require('../services/board.service.js');

var router = express.Router();

var NOT_FOUND = 404;
var CONFLICT = 409;

router.get('/boards/:id', function(req, res) {
    var id = req.params.id;
    boardService.findBoard(id).then(function (board) {
        if(board) {
            res.send(board);
        }
        else {
            res.status(NOT_FOUND).send();
        }
    });
});

/**
 * REST API route to create a new message board with a certain ID.
 */
// Note that this POST has no body! We only need the ID from the URL!
router.post('/boards/:id', function(req, res) {
    var id = req.params.id;
    boardService.hasBoard(id).then(function (hasBoard) {
        if(hasBoard){
            res.status(CONFLICT).send();
        } else {
            var board = boardService.createBoard(id);
            res.send(board);
        }
    });
});

module.exports = router;