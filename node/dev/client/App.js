"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _reactRouterConfig() {
  var data = require("react-router-config");

  _reactRouterConfig = function _reactRouterConfig() {
    return data;
  };

  return data;
}

function _reactRouterDom() {
  var data = require("react-router-dom");

  _reactRouterDom = function _reactRouterDom() {
    return data;
  };

  return data;
}

var _index = _interopRequireDefault(require("./routes/index"));

var _jsxFileName = "/home/ec2-user/environment/srv/node/src/client/App.js";

var _default = function _default(props) {
  return _react().default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, _react().default.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, _react().default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, _react().default.createElement(_reactRouterDom().NavLink, {
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "Home")), _react().default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, _react().default.createElement(_reactRouterDom().NavLink, {
    to: "/todos",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "Todos"))), _react().default.createElement(_reactRouterDom().Switch, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, (0, _reactRouterConfig().renderRoutes)(_index.default)));
};

exports.default = _default;