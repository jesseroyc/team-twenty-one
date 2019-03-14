"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _envService = _interopRequireDefault(require("./service/envService"));

var _winstonLogger = _interopRequireDefault(require("./service/winston-logger"));

function _morgan() {
  var data = _interopRequireDefault(require("morgan"));

  _morgan = function _morgan() {
    return data;
  };

  return data;
}

function _fs() {
  var data = _interopRequireDefault(require("fs"));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  var data = _interopRequireDefault(require("path"));

  _path = function _path() {
    return data;
  };

  return data;
}

function _express() {
  var data = _interopRequireDefault(require("express"));

  _express = function _express() {
    return data;
  };

  return data;
}

function _serializeJavascript() {
  var data = _interopRequireDefault(require("serialize-javascript"));

  _serializeJavascript = function _serializeJavascript() {
    return data;
  };

  return data;
}

function _httpErrors() {
  var data = _interopRequireDefault(require("http-errors"));

  _httpErrors = function _httpErrors() {
    return data;
  };

  return data;
}

function _cookieParser() {
  var data = _interopRequireDefault(require("cookie-parser"));

  _cookieParser = function _cookieParser() {
    return data;
  };

  return data;
}

function _compression() {
  var data = _interopRequireDefault(require("compression"));

  _compression = function _compression() {
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

function _server() {
  var data = _interopRequireDefault(require("react-dom/server"));

  _server = function _server() {
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

var _App = _interopRequireDefault(require("../client/App.js"));

var _index = _interopRequireDefault(require("../client/routes/index.js"));

var _record = _interopRequireDefault(require("./controller/record"));

var _jsxFileName = "/home/ec2-user/environment/srv/node/src/server/server.js";
var ENVS = _envService.default;
var HOST = process.env.IP;
var PORT = process.env.PORT;
var app = (0, _express().default)();
app.use((0, _morgan().default)('dev'));
app.use((0, _compression().default)());
app.use((0, _cookieParser().default)());
app.use(_express().default.json());
app.use(_express().default.urlencoded({
  extended: false
}));
app.get('*', function (req, res, next) {
  var currentRoute = _index.default.find(function (route) {
    return (0, _reactRouterDom().matchPath)(req.url, route);
  }) || {};
  var promise = currentRoute.loadData ? currentRoute.loadData() : Promise.resolve(null);
  promise.then(function (data) {
    var context = {
      data: data
    };

    var indexFile = _path().default.resolve(__dirname, '../index.html');

    _fs().default.readFile(indexFile, 'utf8', function (err, indexData) {
      if (err) {
        console.error('Error:', err);
        return res.status(500).end();
      }

      if (context.status === 404) {
        res.status(404);
      }

      if (context.url) {
        return res.redirect(301, context.url);
      }

      return res.send(indexData.replace('<div id="root"></div>', _server().default.renderToString(_react().default.createElement("div", {
        id: "root",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, _react().default.createElement(_reactRouterDom().StaticRouter, {
        location: req.url,
        context: context,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, _react().default.createElement(_App.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }))))).replace('</body>', "<script>window.__ROUTE_DATA__=".concat((0, _serializeJavascript().default)(data), "</script></body>")));
    });
  });
});
app.use(function (req, res, next) {
  next((0, _httpErrors().default)(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  _winstonLogger.default.error("".concat(err.status || 500, " - ").concat(err.message, " - ").concat(req.originalUrl, " - ").concat(req.method, " - ").concat(req.ip));

  res.status(err.status || 500);
  res.render('error');
});
app.listen(PORT, function (err) {
  if (err) {
    _winstonLogger.default.error(err);

    process.exit(1);
  }

  app.route('/record/view').get(_record.default.view);
  app.route('/record/:values').post(_record.default.post);

  _winstonLogger.default.info("APP is now running on port ".concat(PORT, " at ").concat(HOST));
});