"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _db = require("./db");

var _db2 = _interopRequireDefault(_db);

var _controllers = require("./controllers");

var _controllers2 = _interopRequireDefault(_controllers);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _error = require("./common/error.interceptor");

var _error2 = _interopRequireDefault(_error);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    server = _http2.default.createServer(app);

// middleware
app.use((0, _cors2.default)({
  exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

app.use((0, _compression2.default)());
app.use((0, _helmet2.default)());

// connect to db
(0, _db2.default)(_config2.default).then(function (db) {
  // api router
  app.use("/api", (0, _controllers2.default)({ config: _config2.default, db: db }));

  app.use(_express2.default.static(__dirname + '/client'));

  app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname + '/client', 'index.html'));
  });

  app.use(_error2.default);

  server.listen(process.env.PORT || _config2.default.port, function () {
    console.log("Started on port " + server.address().port);
  });
});

exports.default = app;