var express = require('express');
var board = require('../services/boardService.js');

var router = express.Router();

router.get('/boards/:id', function(req, res, next) {
    var id = req.params.id;
    var requestedBoard = board.findOrCreateBoard(id);
    res.send(requestedBoard);
});

module.exports = router;