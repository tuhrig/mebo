var chai = require('chai');
var sinon = require('sinon');
var request = require('supertest');
var app = require('../../server.js');
var expect = chai.expect;

var boardService = require('../../src/services/board.service.js');

describe("Route", function () {

    describe("GET", function () {

        it('/boards/<ID>/messages should return 404 if board was not found', function(done) {
            request(app)
                .get('/api/boards/unknown/messages')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);

                    expect(res.body.message).to.equal('No board found with ID: unknown');

                    done();
                });
        });

        it('/boards/<ID>/messages should return messages', function(done) {

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

    describe("POST", function () {

        it('/boards/<ID>/messages should return 404 if board was not found', function(done) {
            request(app)
                .post('/api/boards/unknown/messages')
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);

                    expect(res.body.message).to.equal('No board found with ID: unknown');

                    done();
                });
        });

        it('/boards/<ID>/messages should create message', function(done) {

            boardService.createBoard("my-board");

            request(app)
                .post('/api/boards/my-board/messages')
                .send({ text: "test 123"})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);

                    var messages = boardService.findMessages("my-board");

                    expect(messages.length).to.equal(1);
                    expect(messages[0].text).to.equal("test 123");
                    expect(messages[0].votes).to.equal(0);
                    expect(messages[0].date).to.be.ok;
                    expect(messages[0].id).to.be.ok;

                    done();
                });
        });

        it('/boards/<ID>/messages should return the created message', function(done) {

            boardService.createBoard("my-board");

            request(app)
                .post('/api/boards/my-board/messages')
                .send({ text: "test 123"})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);

                    expect(res.body.text).to.equal("test 123");
                    expect(res.body.votes).to.equal(0);
                    expect(res.body.date).to.be.ok;
                    expect(res.body.id).to.be.ok;

                    done();
                });
        });
    });
});