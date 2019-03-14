"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof2() {
  var data = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

  _typeof2 = function _typeof2() {
    return data;
  };

  return data;
}

var defaults = require('defaults');

var transports = require('./transports');

var winston = require('winston');

var logger = create({
  console: true
});
var _default = logger;
exports.default = _default;

function create(options) {
  if (!options) throw new Error('Winston logger must be initialized with options.');
  setColors();
  setLevels(winston);
  var enabled = [];
  Object.keys(options).forEach(function (key) {
    var opts = options[key];
    if (!opts) return;
    if ((0, _typeof2().default)(opts) !== 'object') opts = {};

    if (!transports[key]) {
      throw new Error('Failed to find transport ' + key);
    }

    var Transport = transports[key];
    var transport = Transport(opts);
    if (transport) enabled.push(transport);
  });
  var logger = new winston.Logger({
    transports: enabled
  });
  setLevels(logger);
  return logger;
}

function setLevels(logger, levels) {
  levels = defaults(levels, {
    silly: 0,
    verbose: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    critical: 6,
    fatal: 7
  });
  logger.setLevels(levels);
}

function stream() {}

winston.stream({
  start: -1
}).on('log', function (log) {
  console.log(log);
});

function setColors(colors) {
  colors = defaults(colors, {
    silly: 'magenta',
    verbose: 'blue',
    debug: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    critical: 'red',
    fatal: 'red'
  });
  winston.addColors(colors);
}