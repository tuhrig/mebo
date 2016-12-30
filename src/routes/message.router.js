var express = require('express');
var messageService = require('../services/message.service.js');
var boardService = require('../services/board.service.js');

var router = express.Router();

router.get('/boards/:id/messages', function(req, res) {
    var id = req.params.id;
    messageService.findMessages(id).then(function (messages) {
        if(messages) {
            res.send(messages);
        }
        else {
            res.status(404).send();
        }
    });
});

router.post('/boards/:id/messages', function(req, res) {
    var id = req.params.id;
    var text = req.body.text;

    boardService.hasBoard(id).then(function (hasBoard) {
        if(hasBoard) {
            messageService.createMessage(id, text).then(function (message) {
                res.send(message);
            });
        } else {
            res.status(404).send();
        }
    });
});

router.delete('/boards/:boardId/messages/:messageId', function(req, res) {
    var boardId = req.params.boardId;
    var messageId = req.params.messageId;

    messageService.deleteMessage(boardId, messageId).then(function (message) {
        if(message) {
            res.send(message);
        } else {
            res.status(404).send();
        }
    });
});

router.put('/boards/:boardId/messages/:messageId', function(req, res) {
    var boardId = req.params.boardId;
    var messageId = req.params.messageId;

    messageService.updateMessage(boardId, messageId, req.body.text, req.body.votes).then(function (message) {
        if(message) {
            res.send(message);
        } else {
            res.status(404).send();
        }
    });
});

module.exports = router;