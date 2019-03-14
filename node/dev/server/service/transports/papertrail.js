"use strict";

var defaults = require('defaults');

module.exports = papertrail;

function papertrail(options) {
  options = defaults(options, {
    level: 'info',
    colorize: true,
    prettyPrint: true,
    timestamp: false
  });

  var Papertrail = require('winston-papertrail').Papertrail;

  return new Papertrail(options);
}