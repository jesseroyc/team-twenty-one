"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Home = _interopRequireDefault(require("../pages/Home"));

var _Todos = _interopRequireDefault(require("../pages/Todos"));

var _NotFound = _interopRequireDefault(require("../pages/NotFound"));

var _loadData2 = _interopRequireDefault(require("../pages/helpers/loadData"));

var Routes = [{
  path: '/',
  exact: true,
  component: _Home.default
}, {
  path: '/todos',
  component: _Todos.default,
  loadData: function loadData() {
    return (0, _loadData2.default)('todos');
  }
}, {
  component: _NotFound.default
}];
var _default = Routes;
exports.default = _default;