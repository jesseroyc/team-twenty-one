"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck2() {
  var data = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

  _classCallCheck2 = function _classCallCheck2() {
    return data;
  };

  return data;
}

function _createClass2() {
  var data = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

  _createClass2 = function _createClass2() {
    return data;
  };

  return data;
}

function _possibleConstructorReturn2() {
  var data = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

  _possibleConstructorReturn2 = function _possibleConstructorReturn2() {
    return data;
  };

  return data;
}

function _getPrototypeOf2() {
  var data = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

  _getPrototypeOf2 = function _getPrototypeOf2() {
    return data;
  };

  return data;
}

function _inherits2() {
  var data = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

  _inherits2 = function _inherits2() {
    return data;
  };

  return data;
}

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

var _loadData = _interopRequireDefault(require("./helpers/loadData"));

var _jsxFileName = "/home/ec2-user/environment/srv/node/src/client/pages/Todos.js";

var Todos = function (_React$Component) {
  (0, _inherits2().default)(Todos, _React$Component);

  function Todos(props) {
    var _this;

    (0, _classCallCheck2().default)(this, Todos);
    _this = (0, _possibleConstructorReturn2().default)(this, (0, _getPrototypeOf2().default)(Todos).call(this, props));

    if (props.staticContext && props.staticContext.data) {
      _this.state = {
        data: props.staticContext.data
      };
    } else {
      _this.state = {
        data: []
      };
    }

    return _this;
  }

  (0, _createClass2().default)(Todos, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        if (window.__ROUTE_DATA__) {
          _this2.setState({
            data: window.__ROUTE_DATA__
          });

          delete window.__ROUTE_DATA__;
        } else {
          (0, _loadData.default)('todos').then(function (data) {
            _this2.setState({
              data: data
            });
          });
        }
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.state.data;
      return _react().default.createElement("ul", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, data.map(function (todo) {
        return _react().default.createElement("li", {
          key: todo.id,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        }, todo.title);
      }));
    }
  }]);
  return Todos;
}(_react().default.Component);

var _default = Todos;
exports.default = _default;