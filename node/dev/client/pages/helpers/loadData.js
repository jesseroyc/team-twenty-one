"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("isomorphic-fetch");

var _default = function _default(resourceType) {
  return fetch("https://jsonplaceholder.typicode.com/".concat(resourceType)).then(function (res) {
    return res.json();
  }).then(function (data) {
    return data.filter(function (_, idx) {
      return idx < 10;
    });
  });
};

exports.default = _default;