
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

        it('should return messages board', function() {
            boardService.createBoard("my-board");
            var messages = boardService.findMessages("my-board");
            expect(messages).to.not.equal(null);
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
});