var chai = require('chai');
var sinon = require('sinon');
var request = require('supertest');
var app = require('../../server.js');
var chai = require('chai');
var expect = chai.expect;

var boardService = require('../../src/services/boardService.js');

describe("Route /boards", function () {


    it('GET /boards/<ID> should return 404 if board was not found', function(done) {
        request(app)
            .get('/api/boards/unknown')
            .expect('Content-Type', /json/)
            .expect(404, {
                message: 'No board found with ID: unknown'
            })
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
            .post('/api/boards/my-board')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });

        var hasBoard = boardService.hasBoard("my-board");
        expect(hasBoard).to.equal(true);
    });
});