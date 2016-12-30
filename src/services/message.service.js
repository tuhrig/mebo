var _ = require('lodash');
var boardService = require('./board.service.js');
var idGenerator = require('./id-generation.service.js');

/**
 * This function will return all messages of a board. If no such board
 * exists, null will be returned. Note that the messages might be empty,
 * so an empty array will be returned (length === 0).
 *
 * @param id The ID of the message board
 * @returns {*} The messages or null if no board found
 */
function findMessages(id) {
    return boardService.findBoard(id).then(function(board) {
        if(board) {
            return board.messages;
        }
        return null;
    });
}

function findMessage(boardId, messageId) {
    return boardService.findBoard(boardId).then(function(board) {
        if(board) {
            var messages = board.messages;
            return _.find(messages, {id: messageId}) || null;
        }
        return null;
    });
}

/**
 * This function will create a new message on the given message
 * board. The message will contain the text as well as a creation
 * date. The updated message board will be returned. If the no
 * board with the given ID is found, null will be returned.
 *
 * @param id The ID of the message board
 * @param text The text message
 * @returns {*} The updated message board
 */
function createMessage(id, text) {
    return boardService.findBoard(id).then(function(board) {
        if(board) {

            var message = {
                text: text,
                date: new Date(),
                votes: 0,
                id: idGenerator.generateId()
            };

            board.messages.push(message);

            boardService.updateBoard(board);

            return message;
        }
        return null;
    });
}

function deleteMessage(boardId, messageId) {
    return boardService.findBoard(boardId).then(function(board) {
        if(board) {

            var deletedMessages = _.remove(board.messages, function(message) {
                return message.id === messageId;
            });

            boardService.updateBoard(board);

            // Lodash will return an array of deleted objects. However, we can
            // be sure that there is only one such message as our IDs are unique.
            // So we return the first (and only!) object of the array.
            var message = deletedMessages[0];
            return message || null; // Null or the message! Otherwise we would return
                                    // undefined when no message is found.

        }
        return null;
    });
}

function updateMessage(boardId, messageId, text, votes) {
    return boardService.findBoard(boardId).then(function(board) {
        if(board) {
            var messages = board.messages;
            var message = _.find(messages, {id: messageId}) || null;
            if(message) {

                if(text) {
                    message.text = text;
                }

                if(votes) {
                    message.votes = votes;
                }
            }

            boardService.updateBoard(board);
            return message;
        }
        return null;
    });
}

module.exports = {
    findMessage: findMessage,
    findMessages: findMessages,
    createMessage: createMessage,
    deleteMessage: deleteMessage,
    updateMessage: updateMessage
};