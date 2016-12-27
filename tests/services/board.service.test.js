
var chai = require('chai');
var expect = chai.expect;

var boardService = require('../../src/services/board.service.js');

describe('BoardService: ', function() {

    describe('findBoard', function () {

        it('should return null if no board exists', function() {
            var board = boardService.findBoard("unknown");
            expect(board).to.equal(null);
        });

        it('should return requested board', function() {
            boardService.createBoard("my-board");
            var board = boardService.findBoard("my-board");
            expect(board).to.not.equal(null);
        });
    });

    describe('hasBoard', function () {

        it('should return false if the board does not exist', function() {
            var hasBoard = boardService.hasBoard("unknown");
            expect(hasBoard).to.equal(false);
        });

        it('should return true if the board exists', function() {
            boardService.createBoard("my-board");
            var hasBoard = boardService.hasBoard("my-board");
            expect(hasBoard).to.equal(true);
        });
    });

    describe('findMessages', function () {

        it('should return null if no board exists', function() {
            var messages = boardService.findMessages("unknown");
            expect(messages).to.equal(null);
        });

        it('should return messages from board', function() {
            boardService.createBoard("my-board");
            var messages = boardService.findMessages("my-board");
            expect(messages).to.not.equal(null);
        });
    });

    describe('findMessage', function () {

        it('should return null if no board exists', function() {
            // no board created!
            var message = boardService.findMessage("unknown", "message-id");
            expect(message).to.equal(null);
        });

        it('should return null if no message exists', function() {
            var board = boardService.createBoard("my-board");
            // no message created!
            var message = boardService.findMessage("my-board", "unknown");
            expect(message).to.equal(null);
        });

        it('should return message', function() {
            boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a test");
            var foundMessage = boardService.findMessage("my-board", message.id);
            expect(foundMessage).to.not.equal(null);
            expect(foundMessage).to.equal(message);
        });
    });

    describe('createBoard', function () {

        it('should create board with ID', function() {
            var board = boardService.createBoard("my-board");
            expect(board.id).to.equal("my-board");
        });

        it('should create board no messages initially', function() {
            var board = boardService.createBoard("my-board");
            expect(board.messages.length).to.equal(0);
        });

        it('should create board with creation date', function() {
            var board = boardService.createBoard("my-board");
            expect(board.date).to.be.ok;
        });
    });

    describe('createMessage', function () {

        it('should create new message', function() {
            boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a test");
            expect(message).to.not.equal(null);
        });

        it('should create new message with given text', function() {
            boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a test");
            expect(message.text).to.equal("This is a test");
        });

        it('should create new message with creation date', function() {
            boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a test");
            expect(message.date).to.be.ok;
        });

        it('should create new message with 0 votes', function() {
            boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a test");
            expect(message.votes).to.equal(0);
        });

        it('should create new message with an ID', function() {
            boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a test");
            expect(message.id).to.be.ok;
            expect(message.id.length).to.equal(8);
        });
    });

    describe('deleteMessage', function () {

        it('should delete a message', function () {
            var board = boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a text");

            expect(board.messages.length).to.equal(1);
            boardService.deleteMessage("my-board", message.id);
            expect(board.messages.length).to.equal(0);
        });

        it('should return the deleted message', function () {
            var board = boardService.createBoard("my-board");
            var message = boardService.createMessage("my-board", "This is a text");
            var deletedMessage = boardService.deleteMessage("my-board", message.id);

            expect(deletedMessage.text).to.equal("This is a text");
        });

        it('should return null if board is not found', function () {
            // no board created!
            var message = boardService.deleteMessage("unknwon-board", "some-id");
            expect(message).to.equal(null);
        });

        it('should return null if message is not found', function () {
            boardService.createBoard("my-board");
            // no message created!
            var message = boardService.deleteMessage("my-board", "some-id");
            expect(message).to.equal(null);
        });
    });
});