var express = require('express');
var boardService = require('../services/board.service.js');

var router = express.Router();

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

    var message = boardService.createMessage(id, text);
    res.send(message);
});

router.delete('/boards/:boardId/messages/:messageId', function(req, res) {
    var boardId = req.params.boardId;
    var messageId = req.params.messageId;

    var message = boardService.deleteMessage(boardId, messageId);
    if(message) {
        res.send(message);
    } else {
        res.status(404).send();
    }
});

router.put('/boards/:boardId/messages/:messageId', function(req, res) {
    var boardId = req.params.boardId;
    var messageId = req.params.messageId;

    var message = boardService.findMessage(boardId, messageId);
    if(message) {

        // TODO

    } else {
        res.status(404).send();
    }
});

module.exports = router;