"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RecordSchema = void 0;

function _defineProperty2() {
  var data = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

  _defineProperty2 = function _defineProperty2() {
    return data;
  };

  return data;
}

function _mongoose() {
  var data = _interopRequireWildcard(require("mongoose"));

  _mongoose = function _mongoose() {
    return data;
  };

  return data;
}

var _winstonLogger = _interopRequireDefault(require("../service/winston-logger"));

var _RecordSchema$index;

var RecordSchema = new (_mongoose().Schema)({
  typ: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    required: true
  },
  id: {
    type: Number,
    index: true,
    required: true
  },
  tim: {
    type: Number,
    required: true
  },
  val: {
    type: Number,
    required: true
  }
}, {
  collection: 'records'
});
exports.RecordSchema = RecordSchema;
RecordSchema.pre('view', function (next) {
  if (!this.typ || !this.val) {
    _winstonLogger.default.info('Missing typ OR val!');

    next();
  }

  if (this.type === ('tmp' || "moi" || "lum")) {
    _winstonLogger.default.info('Key typ is not tmp, moi, or val!');

    next();
  }

  next();
});
RecordSchema.pre('post', function (next) {
  if (!this.typ || !this.val) {
    _winstonLogger.default.info('Missing typ OR val!');

    next();
  }

  if (this.type === ('tmp' || "moi" || "lum")) {
    _winstonLogger.default.info('Key typ is not tmp, moi, or val!');

    next();
  }
});
RecordSchema.index((_RecordSchema$index = {
  typ: 'tmp',
  _id: 1
}, (0, _defineProperty2().default)(_RecordSchema$index, "typ", 'moi'), (0, _defineProperty2().default)(_RecordSchema$index, "_id", 1), (0, _defineProperty2().default)(_RecordSchema$index, "typ", 'lum'), (0, _defineProperty2().default)(_RecordSchema$index, "_id", 1), _RecordSchema$index));

var _default = _mongoose().default.model('Record', RecordSchema);

exports.default = _default;