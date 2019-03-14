"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _App = _interopRequireDefault(require("./App"));

var _jsxFileName = "/home/ec2-user/environment/srv/node/src/client/App.test.js";
it('renders without crashing', function () {
  var div = document.createElement('div');

  _reactDom().default.render(_react().default.createElement(_App.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), div);

  _reactDom().default.unmountComponentAtNode(div);
});