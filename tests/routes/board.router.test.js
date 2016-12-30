var chai = require('chai');
var request = require('supertest');
var app = require('../../server.js');
var expect = chai.expect;

var boardService = require('../../src/services/board.service.js');

describe("Route", function () {

    it('GET /boards/<ID> should return 404 if board was not found', function(done) {
        request(app)
            .get('/api/boards/unknown')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /boards/<ID> should return board', function(done) {

        boardService.createBoard("my-board");

        request(app)
            .get('/api/boards/my-board')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('POST /boards/<ID> should create board', function(done) {

        request(app)
            .post('/api/boards/my-board-123')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                // async!
                boardService.hasBoard("my-board-123").then(function (hasBoard) {
                    expect(hasBoard).to.equal(true);
                    done();
                });
            });
    });

    it('POST /boards/<ID> should return conflict if board ID already exists', function(done) {

        boardService.createBoard("my-board-42");

        request(app)
            .post('/api/boards/my-board-42')
            .expect(409)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});