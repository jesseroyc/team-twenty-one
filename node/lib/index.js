"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _reactDom() {
  var data = _interopRequireDefault(require("react-dom"));

  _reactDom = function _reactDom() {
    return data;
  };

  return data;
}

require("./index.css");

function _reactRouterDom() {
  var data = require("react-router-dom");

  _reactRouterDom = function _reactRouterDom() {
    return data;
  };

  return data;
}

var serviceWorker = _interopRequireWildcard(require("./serviceWorker"));

var _App = _interopRequireDefault(require("./client/App"));

var _jsxFileName = "/home/ec2-user/environment/srv/node/src/index.js";

_reactDom().default.hydrate(_react().default.createElement(_reactRouterDom().BrowserRouter, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10
  },
  __self: void 0
}, _react().default.createElement(_App.default, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 11
  },
  __self: void 0
})), document.getElementById('root'));

serviceWorker.unregister();