"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

function _cors() {
  var data = _interopRequireDefault(require("cors"));

  _cors = function _cors() {
    return data;
  };

  return data;
}

var _server = _interopRequireDefault(require("../server.js"));

_server.default.use((0, _cors().default)());

_server.default.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

_server.default.get('/', function (req, res, next) {});

_server.default.post('/', function (req, res, next) {});