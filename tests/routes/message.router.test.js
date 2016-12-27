var chai = require('chai');
var sinon = require('sinon');
var request = require('supertest');
var app = require('../../server.js');
var chai = require('chai');
var expect = chai.expect;

var boardService = require('../../src/services/board.service.js');

describe("Route", function () {

    it('GET /boards/<ID>/messages should return 404 if board was not found', function(done) {
        request(app)
            .get('/api/boards/unknown/messages')
            .expect('Content-Type', /json/)
            .expect(404, {
                message: 'No board found with ID: unknown'
            })
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /boards/<ID>/messages should return messages', function(done) {

        boardService.createBoard("my-board");
        boardService.createMessage("my-board", "some sample text");

        request(app)
            .get('/api/boards/my-board/messages')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(res.body.length).to.equal(1);
                expect(res.body[0].text).to.equal("some sample text");

                done();
            });
    });
});