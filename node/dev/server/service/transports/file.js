"use strict";

var defaults = require('defaults');

var fs = require('fs');

var path = require('path');

var winston = require('winston');

module.exports = file;

function file(options) {
  options = defaults(options, {
    level: 'info',
    name: guessAppName() + '.log',
    directory: 'logs',
    maxSize: 1024 * 1024 * 10,
    maxFiles: 10,
    colorize: false,
    timestamp: true,
    json: false
  });
  var directory = path.join(process.cwd(), options.directory);
  ensureLogDir(directory);
  var filename = path.join(directory, options.name);
  options.filename = filename;
  return new winston.transports.File(options);
}

var guessAppName = function guessAppName() {
  var tokens = path.dirname(process.argv[1]).split(path.sep);
  return tokens[tokens.length - 1];
};

var ensureLogDir = function ensureLogDir(dir) {
  var dirExists = fs.existsSync(dir);
  if (!dirExists) fs.mkdirSync(dir);
};