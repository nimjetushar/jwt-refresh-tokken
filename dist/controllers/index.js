"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _auth = require("./auth.controller");

var _auth2 = _interopRequireDefault(_auth);

var _app = require("./app.controller");

var _app2 = _interopRequireDefault(_app);

var _resetPassword = require("./resetPassword.controller");

var _resetPassword2 = _interopRequireDefault(_resetPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  api.use("/auth", _auth2.default);

  api.use("/data", _app2.default);

  api.use("/reset", _resetPassword2.default);

  return api;
};