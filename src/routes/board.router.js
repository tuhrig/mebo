var express = require('express');
var boardService = require('../services/board.service.js');

var router = express.Router();

var NOT_FOUND = 404;
var CONFLICT = 409;

router.get('/boards/:id', function(req, res) {
    var id = req.params.id;
    var board = boardService.findBoard(id);

    if(board) {
        res.send(board);
    }
    else {
        var error = {
            message: 'No board found with ID: ' + id
        };
        res.status(NOT_FOUND).send(error);
    }
});

/**
 * REST API route to create a new message board with a certain ID.
 */
// Note that this POST has no body! We only need the ID from the URL!
router.post('/boards/:id', function(req, res) {
    var id = req.params.id;
    if(boardService.hasBoard(id)) {
        var error = {
            message: 'Board already exists: ' + id
        };
        res.status(CONFLICT).send(error);
    } else {
        var board = boardService.createBoard(id);
        res.send(board);
    }
});

module.exports = router;