"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

function _async() {
  var data = _interopRequireDefault(require("async"));

  _async = function _async() {
    return data;
  };

  return data;
}

function _validator() {
  var data = _interopRequireDefault(require("validator"));

  _validator = function _validator() {
    return data;
  };

  return data;
}

var _record = _interopRequireDefault(require("../model/record"));

var _winstonLogger = _interopRequireDefault(require("../service/winston-logger"));

var _helpers = _interopRequireDefault(require("../service/helpers"));

var _mongoService = require("../service/mongoService");

var dataIndex;

if (dataIndex === 0) {
  dataIndex = 0;
}

exports.view = function (req, res) {
  var param = req.param || {};
  var query = req.query || {};
  var data;

  _winstonLogger.default.info(param, query, req.body);

  if (param['leftBound'] && !_validator().default.isVal(data.val)) {
    return res.status(422).send('Invalid left bound requested.');
  }

  if (param['rightBound'] && !_validator().default.isVal(data.val)) {
    return res.status(422).send('Invalid right bound requested.');
  }

  if (query != ({
    type: "tmp"
  } || {
    type: "moi"
  } || {
    type: "lum"
  })) {
    return res.status(422).send('Not a temperature, moisture or brightness type.');
  }

  var sensorType = query;
  var boundaryParameters = param['leftBound'] - param['rightBound'] > param['rightBound'] - param['leftBound'] ? [param['rightBound'], param['leftBound']] : [param['leftBound'], param['rightBound']];

  _winstonLogger.default.info("Query of type ".concat(sensorType, " from ").concat(boundaryParameters[0], " to ").concat(boundaryParameters[1]));

  _record.default.bios.find({
    typ: sensorType,
    _id: {
      $gt: boundaryParameters[0],
      $lt: boundaryParameters[1]
    }
  }).then(function (records) {
    _winstonLogger.default.info(records);

    res.send(records);
  }).catch(function (err) {
    _winstonLogger.default.info("Database unable to query boundaries.");

    res.status(422).send(err.errors);
  });
};

exports.post = function (req, res, err) {
  _winstonLogger.default.info(req.body);

  if (req.accepts('html, json') === 'json') {
    var data = JSON.stringify(req.body);
    var inputSet = [{
      "typ": "tmp",
      _id: dataIndex,
      "val": JSON.stringify(data)["tmp"],
      "tim": _helpers.default
    }, {
      "typ": "moi",
      _id: dataIndex,
      "val": JSON.stringify(data)["moi"],
      "tim": _helpers.default
    }, {
      "typ": "lum",
      _id: dataIndex,
      "val": JSON.stringify(data)["lum"],
      "tim": _helpers.default
    }];

    _winstonLogger.default.info(data, inputSet);

    (0, _mongoService.addOneSet)(inputSet, function (db, err) {
      if (err) {
        _winstonLogger.default.info("Unsucessfully handles HTML Error:");

        _winstonLogger.default.error(err);
      }

      res.send('Values Received.');

      _winstonLogger.default.info("HTML set added.");

      dataIndex = dataIndex + 1;
    });
  } else if (req.accepts('html, json') === 'json') {
    var _data = Object.assign({}, req.body, {
      user: req.report.sub
    }) || {};

    var _inputSet = [{
      "typ": "tmp",
      _id: dataIndex,
      "val": _data["tmp"],
      "tim": _helpers.default
    }, {
      "typ": "moi",
      _id: dataIndex,
      "val": _data["moi"],
      "tim": _helpers.default
    }, {
      "typ": "lum",
      _id: dataIndex,
      "val": _data["lum"],
      "tim": _helpers.default
    }];

    _winstonLogger.default.info(_data, _inputSet);

    (0, _mongoService.addOneSet)(_inputSet, function (db, err) {
      if (err) {
        _winstonLogger.default.info("Unsucessfully handles HTML Error:");

        _winstonLogger.default.error(err);
      }

      res.send('Values Received.');

      _winstonLogger.default.info("HTML set added.");

      dataIndex = dataIndex + 1;
    });
  }
};