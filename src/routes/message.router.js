var express = require('express');
var boardService = require('../services/board.service.js');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.get('/boards/:id/messages', function(req, res) {
    var id = req.params.id;
    var messages = boardService.findMessages(id);

    if(messages) {
        res.send(messages);
    }
    else {
        var error = {
            message: 'No board found with ID: ' + id
        };
        res.status(404).send(error);
    }
});

router.post('/boards/:id/messages', function(req, res) {
    var id = req.params.id;
    var text = req.body.text;

    if(!boardService.hasBoard(id)) {
        var error = {
            message: 'No board found with ID: ' + id
        };
        res.status(404).send(error);
        return;
    }

    var board = boardService.createMessage(id, text);
    res.send(board);
});

module.exports = router;