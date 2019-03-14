"use strict";

var winston = require('winston');

var defaults = require('defaults');

module.exports = console;

function console(options) {
  options = defaults(options, {
    level: 'info',
    colorize: true,
    prettyPrint: true,
    timestamp: false,
    handleExceptions: true
  });
  return new winston.transports.Console(options);
}