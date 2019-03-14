"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winstonLogger = _interopRequireDefault(require("./winston-logger"));

function _assert() {
  var data = _interopRequireDefault(require("assert"));

  _assert = function _assert() {
    return data;
  };

  return data;
}

var _helpers = require("./helpers");

var _envService = _interopRequireDefault(require("./envService"));

function _async() {
  var data = _interopRequireDefault(require("async"));

  _async = function _async() {
    return data;
  };

  return data;
}

var ENVS = _envService.default;
var MONGO_ADMIN_USER = ENVS.MONGO_ADMIN_USER,
    MONGO_ADMIN_PASS = ENVS.MONGO_ADMIN_PASS,
    MONGO_ADMIN_ROLE = ENVS.MONGO_ADMIN_ROLE,
    MONGO_ADMIN_NAME = ENVS.MONGO_ADMIN_NAME,
    MONGO_OWNER_USER = ENVS.MONGO_OWNER_USER,
    MONGO_OWNER_PASS = ENVS.MONGO_OWNER_PASS,
    MONGO_OWNER_ROLE = ENVS.MONGO_OWNER_ROLE,
    MONGO_OWNER_NAME = ENVS.MONGO_OWNER_NAME;

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb:".concat(process.env.IP, ":").concat(process.env.PORT);

var connectTest = function connectTest() {
  MongoClient.connect(url, function (err, client) {
    if (err.message.code === 'ETIMEDOUT') {
      _winstonLogger.default.info("TEST: Attempting reconnect after time out.");

      MongoClient.connect(url, {
        useNewUrlParser: true
      });
    } else if (err) {
      _winstonLogger.default.info("Failed to reconnect with {useNewUrlParser}");

      _winstonLogger.default.info(err);
    }

    _winstonLogger.default.info("TEST: Database connected ".concat(process.env.IP, " on ").concat(process.env.PORT));

    var db = new Mongo().getDB(MONGO_OWNER_NAME);
    seedDatabase(db, function () {
      client.close();
    });
  });
};

var seedDatabase = function seedDatabase(db, callback) {
  var collection = db.collection('documents');
  collection.insertMany([{
    typ: 'tmp',
    id: 1,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(1)
  }, {
    typ: 'mos',
    id: 1,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(1)
  }, {
    typ: 'lum',
    id: 1,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(1)
  }, {
    typ: 'tmp',
    id: 2,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(2)
  }, {
    typ: 'mos',
    id: 2,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(2)
  }, {
    typ: 'lum',
    id: 2,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(2)
  }, {
    typ: 'tmp',
    id: 3,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(3)
  }, {
    typ: 'mos',
    id: 3,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(3)
  }, {
    typ: 'lum',
    id: 3,
    val: (0, _helpers.rando)(0, 40),
    tim: (0, _helpers.tStamp)(3)
  }], function (err, result) {
    if (err) {
      _winstonLogger.default.info(err);

      db.close();
    }

    _assert().default.equal(err, null);

    _winstonLogger.default.info("TEST: Inserted 3 documents into the collection");

    callback(result);
  });
};

var getDB = function getDB(err) {
  if (err) {
    _winstonLogger.default.info(err);

    return null;
  }

  return new Mongo().getDB(MONGO_OWNER_NAME);
};

var drop = function drop(done) {
  MongoClient.connect(url, function (err, client) {
    if (err.message.code === 'ETIMEDOUT') {
      _winstonLogger.default.info("Attempting reconnect after time out.");

      MongoClient.connect(url, {
        useNewUrlParser: true
      });
    } else if (err) {
      _winstonLogger.default.info("Failed to reconnect with {useNewUrlParser}");

      _winstonLogger.default.info(err);

      client.close();
    }

    _winstonLogger.default.info("Database connected ".concat(process.env.IP, " on ").concat(process.env.PORT));

    var db = new Mongo().getDB(MONGO_OWNER_NAME);
    db.collections(function (err, collections) {
      if (err) {
        _winstonLogger.default.info(err);

        client.close();
      }

      _async().default.each(collections, function (collection, cb) {
        if (collection.collectionName.indexOf('system') === 0) {
          return cb();
        }

        collection.remove(cb);

        _winstonLogger.default.info("Collection removed.");
      }, done);
    });
  });
};

var addOneSet = function addOneSet(arraySetOfObj, callback) {
  MongoClient.connect(url, function (err, client) {
    if (err.message.code === 'ETIMEDOUT') {
      _winstonLogger.default.info("Attempting reconnect after time out.");

      MongoClient.connect(url, {
        useNewUrlParser: true
      });
    } else if (err) {
      _winstonLogger.default.info("Failed to reconnect with {useNewUrlParser}");

      _winstonLogger.default.info(err);

      client.close();
    }

    _winstonLogger.default.info("Database connected ".concat(process.env.IP, " on ").concat(process.env.PORT));

    var db = new Mongo().getDB(MONGO_OWNER_NAME);
    db.collection.insertOne([arraySetOfObj[0], arraySetOfObj[1], arraySetOfObj[2]], function (err, result) {
      if (err) {
        _winstonLogger.default.info(err);

        client.close();
      }

      _assert().default.equal(err, null);

      _winstonLogger.default.info("Added single set of 3 readings from sensors");

      callback(result);
    });
  });
};

var exportAll = function exportAll(callback) {
  MongoClient.connect(url, function (err, client) {
    if (err.message.code === 'ETIMEDOUT') {
      _winstonLogger.default.info("Attempting reconnect after time out.");

      MongoClient.connect(url, {
        useNewUrlParser: true
      });
    } else if (err) {
      _winstonLogger.default.info("Failed to reconnect with {useNewUrlParser}");

      _winstonLogger.default.info(err);

      client.close();
    }

    _winstonLogger.default.info("Database connected ".concat(process.env.IP, " on ").concat(process.env.PORT));

    var db = new Mongo().getDB(MONGO_OWNER_NAME);
    db.bios.find({
      val: {
        $all: [],
        function: function _function(err, result) {
          if (err) {
            _winstonLogger.default.info(err);

            client.close();
          }

          _assert().default.equal(err, null);

          _winstonLogger.default.info("All values exported");

          callback(result);
        }
      }
    });
  });
};

var _default = {
  drop: drop,
  getDB: getDB,
  connectTest: connectTest,
  addOneSet: addOneSet,
  exportAll: exportAll
};
exports.default = _default;