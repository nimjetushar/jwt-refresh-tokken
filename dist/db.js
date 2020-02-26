"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
  return new Promise(function (resolve, reject) {
    _mongoose2.default.connect(config.db_url, { useNewUrlParser: true });
    // Get Mongoose to use the global promise library
    _mongoose2.default.Promise = global.Promise;
    // Get the default connection
    var db = _mongoose2.default.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on("error", function (err) {
      reject(err);
      console.error("MongoDB connection error:");
    });

    db.once("open", function () {
      // we're connected!
      // connect to a database if needed, then pass it to `callback`:
      console.log("Database connected at" + config.db_url);
      resolve(db);
    });
  });
};