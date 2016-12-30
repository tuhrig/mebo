var chai = require('chai');
var request = require('supertest');
var app = require('../../server.js');
var expect = chai.expect;

var boardService = require('../../src/services/board.service.js');
var messageService = require('../../src/services/message.service.js');

describe("Route", function () {

    describe("GET", function () {

        it('/boards/<ID>/messages should return 404 if board was not found', function(done) {
            request(app)
                .get('/api/boards/unknown/messages')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('/boards/<ID>/messages should return messages', function(done) {

            boardService.createBoard("my-board").then(function () {
                messageService.createMessage("my-board", "some sample text").then(function () {
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
        });
    });

    describe("DELETE", function () {

        it('/boards/<ID>/messages/<ID> should return 404 if board was not found', function(done) {
            request(app)
                .delete('/api/boards/unknown/messages/unknown')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('/boards/<ID>/messages/<ID> should return 404 if message was not found', function(done) {

            boardService.createBoard("my-board").then(function () {
                request(app)
                    .delete('/api/boards/my-board/messages/unknown')
                    .expect(404)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        it('/boards/<ID>/messages/<ID> should delete message', function(done) {

            boardService.createBoard("my-board").then(function () {
                messageService.createMessage("my-board", "This is a text").then(function (message) {
                    request(app)
                        .delete('/api/boards/my-board/messages/' + message.id)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);

                            boardService.findBoard("my-board").then(function (board) {
                                expect(board.messages.length).to.equal(0);
                                done();
                            });
                        });
                });
            });
        });

        it('/boards/<ID>/messages/<ID> should return deleted message', function(done) {

            boardService.createBoard("my-board").then(function () {
                messageService.createMessage("my-board", "This is a text").then(function (message) {
                    request(app)
                        .delete('/api/boards/my-board/messages/' + message.id)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);

                            expect(res.body.id).to.equal(message.id);
                            expect(res.body.text).to.equal('This is a text');

                            done();
                        });
                });
            });
        });
    });
    
    describe("POST", function () {

        it('/boards/<ID>/messages should return 404 if board was not found', function(done) {
            request(app)
                .post('/api/boards/unknown/messages')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('/boards/<ID>/messages should create message', function(done) {

            boardService.createBoard("my-board").then(function () {
                request(app)
                    .post('/api/boards/my-board/messages')
                    .send({ text: "test 123"})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);

                        messageService.findMessages("my-board").then(function (messages) {
                            expect(messages.length).to.equal(1);
                            expect(messages[0].text).to.equal("test 123");
                            expect(messages[0].votes).to.equal(0);
                            expect(messages[0].date).to.be.ok;
                            expect(messages[0].id).to.be.ok;

                            done();
                        });
                    });
            });
        });

        it('/boards/<ID>/messages should return the created message', function(done) {

            boardService.createBoard("my-board").then(function () {
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
    
    describe("PUT", function () {

        it('/boards/<ID>/messages/<ID> should return 404 if board was not found', function(done) {
            request(app)
                .put('/api/boards/unknown/messages/unknown')
                .expect(404)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('/boards/<ID>/messages/<ID> should return 404 if message was not found', function(done) {

            boardService.createBoard("my-board").then(function () {
                request(app)
                    .put('/api/boards/my-board/messages/unknown')
                    .expect(404)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        it('/boards/<ID>/messages/<ID> should update text', function(done) {

            boardService.createBoard("my-board").then(function () {
                messageService.createMessage("my-board", "This is a text").then(function (message) {
                    request(app)
                        .put('/api/boards/my-board/messages/' + message.id)
                        .send({ text: "A new text" })
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);

                            expect(message.text).to.equal("A new text"); // updated!
                            expect(message.votes).to.equal(0); // still old!

                            done();
                        });
                });
            });
        });

        it('/boards/<ID>/messages/<ID> should update votes', function(done) {

            boardService.createBoard("my-board").then(function () {
                messageService.createMessage("my-board", "This is a text").then(function (message) {
                    request(app)
                        .put('/api/boards/my-board/messages/' + message.id)
                        .send({ votes: 42 })
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);

                            expect(message.text).to.equal("This is a text"); // still old!
                            expect(message.votes).to.equal(42); // updated!

                            done();
                        });
                });
            });
        });

        it('/boards/<ID>/messages/<ID> should update text and votes', function(done) {

            boardService.createBoard("my-board").then(function () {
                messageService.createMessage("my-board", "This is a text").then(function (message) {
                    request(app)
                        .put('/api/boards/my-board/messages/' + message.id)
                        .send({ votes: 42, text: "A new text" })
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);

                            expect(message.text).to.equal("A new text"); // updated!
                            expect(message.votes).to.equal(42); // updated!

                            done();
                        });
                });
            });
        });
    });
});