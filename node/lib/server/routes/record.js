"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _record = _interopRequireDefault(require("../controller/record"));

module.exports = function (app) {
  app.route('/record/view').get(_record.default.view);
  app.route('/record/:values').post(_record.default.post);
};