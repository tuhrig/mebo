var chai = require('chai');
var expect = chai.expect;
var q = require('q');

var boardService = require('../../src/services/board.service.js');
var messageService = require('../../src/services/message.service.js');

describe('MessageService: ', function() {

    describe('findMessages', function () {

        it('should return null if no board exists', function() {
            return messageService.findMessages("unknown").then(function (messages) {
                expect(messages).to.equal(null);
            });
        });

        it('should return messages from board', function() {
            return boardService.createBoard("my-board").then(function () {
                return messageService.findMessages("my-board").then(function (messages) {
                    expect(messages).to.eql([]); // empty messages on a new board!
                });
            });
        });
    });

    describe('findMessage', function () {

        it('should return null if no board exists', function() {
            // no board created!
            return messageService.findMessage("unknown", "message-id").then(function (message) {
                expect(message).to.equal(null);
            });
        });

        it('should return null if no message exists', function() {
            return boardService.createBoard("my-board").then(function (board) {
                // no message created!
                return messageService.findMessage("my-board", "unknown").then(function (message) {
                    expect(message).to.equal(null);
                });
            });
        });

        it('should return message', function() {
            return boardService.createBoard("my-board").then(function () {
                return messageService.createMessage("my-board", "This is a test").then(function (message) {
                    return messageService.findMessage("my-board", message.id).then(function (foundMessage) {
                        expect(foundMessage).to.not.equal(null);
                        expect(foundMessage).to.equal(message);
                    });
                });
            });
        });
    });

    describe('createMessage', function () {

        it('should create new message', function() {
            return boardService.createBoard("my-board").then(function () {
                return messageService.createMessage("my-board", "This is a test").then(function (message) {
                    expect(message).to.not.equal(null);
                });
            });
        });

        it('should create new message with given text', function() {
            return boardService.createBoard("my-board").then(function () {
                return messageService.createMessage("my-board", "This is a test").then(function (message) {
                    expect(message.text).to.equal("This is a test");
                });
            });
        });

        it('should create new message with creation date', function() {
            return boardService.createBoard("my-board").then(function () {
                return messageService.createMessage("my-board", "This is a test").then(function (message) {
                    expect(message.date).to.be.ok;
                });
            });
        });

        it('should create new message with 0 votes', function() {
            return boardService.createBoard("my-board").then(function () {
                return messageService.createMessage("my-board", "This is a test").then(function (message) {
                    expect(message.votes).to.equal(0);
                });
            });
        });

        it('should create new message with an ID', function() {
            return boardService.createBoard("my-board").then(function () {
                return messageService.createMessage("my-board", "This is a test").then(function (message) {
                    expect(message.id).to.be.ok;
                    expect(message.id.length).to.equal(8);
                });
            });
        });
    });

    describe('deleteMessage', function () {

        it('should delete a message', function () {
            return boardService.createBoard("my-board").then(function (board) {
                return messageService.createMessage("my-board", "This is a text").then(function (message) {
                    return messageService.findMessages("my-board").then(function (messagesBefore) {
                        expect(messagesBefore.length).to.equal(1);
                        return messageService.deleteMessage("my-board", message.id).then(function () {
                            return messageService.findMessages("my-board").then(function (messagesAfter) {
                                expect(messagesAfter.length).to.equal(0);
                            });
                        });
                    });
                });
            });
        });

        it('should return the deleted message', function () {
            return boardService.createBoard("my-board").then(function (board) {
                return messageService.createMessage("my-board", "This is a text").then(function (message) {
                    return messageService.deleteMessage("my-board", message.id).then(function (deletedMessage) {
                        expect(deletedMessage.text).to.equal("This is a text");
                    });
                });
            });
        });

        it('should return null if board is not found', function () {
            // no board created!
            return messageService.deleteMessage("unknwon-board", "some-id").then(function (deletedMessage) {
                expect(deletedMessage).to.equal(null);
            });
        });

        it('should return null if message is not found', function () {
            return boardService.createBoard("my-board").then(function () {
                // no message created!
                return messageService.deleteMessage("my-board", "some-id").then(function (deletedMessage) {
                    expect(deletedMessage).to.equal(null);
                });
            });
        });
    });
});