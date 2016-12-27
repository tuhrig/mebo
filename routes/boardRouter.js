var express = require('express');
var boardService = require('../services/boardService.js');

var router = express.Router();

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
        res.status(404).send(error);
    }
});

router.post('/boards/:id', function(req, res) {
    var id = req.params.id;
    var board = boardService.createBoard(id);
    res.send(board);
});

module.exports = router;