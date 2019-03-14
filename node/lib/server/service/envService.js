"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importEnvVars = importEnvVars;
exports.stringToParsedEnvObj = stringToParsedEnvObj;
exports.debugStringToEnvObj = debugStringToEnvObj;
exports.default = void 0;

function _dotenv() {
  var data = _interopRequireDefault(require("dotenv"));

  _dotenv = function _dotenv() {
    return data;
  };

  return data;
}

require('dotenv').config();

function importEnvVars() {
  require('dotenv').config();

  var result = _dotenv().default.config();

  if (result.error) {
    throw result.error;
  }

  var envs = result.parsed;
  return envs;
}

;

function stringToParsedEnvObj(stringToParse) {
  var dotenv = require('dotenv');

  var buf = Buffer.from(stringToParse);
  var config = dotenv.parse(buf);
  var result = config;
  return result;
}

;

function debugStringToEnvObj(stringToParse) {
  var dotenv = require('dotenv');

  var buf = Buffer.from(stringToParse);
  var opt = {
    debug: true
  };
  var config = dotenv.parse(buf, opt);
  var result = config;
  return result;
}

;
var ENVS = importEnvVars();
var _default = {
  ENVS: ENVS
};
exports.default = _default;