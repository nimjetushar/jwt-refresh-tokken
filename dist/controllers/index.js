"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _auth = require("./auth.controller");

var _auth2 = _interopRequireDefault(_auth);

var _package = require("../../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  // mount the facets resource
  api.use("/auth", _auth2.default);

  // perhaps expose some API metadata at the root
  api.get("/", function (req, res) {
    res.json(_package.version);
  });

  return api;
};
//# sourceMappingURL=index.js.map