"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var rando = function rando(min, max) {
  var ret;

  for (;;) {
    ret = min + Math.random() * (max - min) * 1.1;

    if (ret <= max) {
      break;
    }
  }

  return ret;
};

var tStamp = function tStamp(n) {
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime() + n * 1000;
    };
  }
};

var _default = {
  rando: rando,
  tStamp: tStamp
};
exports.default = _default;