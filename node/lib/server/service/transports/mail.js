"use strict";

var defaults = require('defaults');

var os = require('os');

var winston = require('winston-mail');

module.exports = mail;

function mail(options) {
  options = defaults(options, {
    timestamp: true,
    prettyPrint: true
  });
  if (options.subject) options.subject = '[' + os.hostname() + '] - ' + options.subject;
  return new winston.Mail(options);
}