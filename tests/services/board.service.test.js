var chai = require('chai');
var expect = chai.expect;
var q = require('q');

var boardService = require('../../src/services/board.service.js');

describe('BoardService: ', function() {

    describe('findBoard', function () {

        it('should return null if no board exists', function() {
            return boardService.findBoard("unknown").then(function (board) {
                expect(board).to.equal(null);
            });
        });

        it('should return requested board', function() {
            return boardService.createBoard("my-board").then(function () {
                return boardService.findBoard("my-board").then(function (board) {
                    expect(board).to.not.equal(null);
                });
            });
        });
    });

    describe('hasBoard', function () {

        it('should return null if no board exists', function() {
            return boardService.hasBoard("unknown").then(function (hasBoard) {
                expect(hasBoard).to.equal(false);
            });
        });

        it('should return requested board', function() {
            return boardService.createBoard("my-board").then(function () {
                return boardService.hasBoard("my-board").then(function (hasBoard) {
                    expect(hasBoard).to.equal(true);
                });
            });
        });
    });

    describe('createBoard', function () {

        it('should create board with ID', function() {
            return boardService.createBoard("my-board").then(function (board) {
                expect(board.id).to.equal("my-board");
            });
        });

        it('should create board no messages initially', function() {
            return boardService.createBoard("my-board").then(function (board) {
                expect(board.messages.length).to.equal(0);
            });
        });

        it('should create board with creation date', function() {
            return boardService.createBoard("my-board").then(function (board) {
                expect(board.date).to.be.ok;
            });
        });
    });
});