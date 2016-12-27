var _ = require('lodash');
var boardService = require('../services/boardService.js');

var log4js = require( "log4js" );
var logger = log4js.getLogger("messageService");

logger.info("Init messageService");


module.exports = {
    find: find,
    create: create
};