"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth = require("../models/auth.model");

var _error = require("../constant/error");

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isUserAuthenticated = function isUserAuthenticated(req, res, next) {
  var token = req.headers.authorization;

  (0, _auth.verifyToken)(token).then(function (tokendata) {
    var headerToken = tokendata.token;

    res.set({
      authorization: headerToken,
      "Access-Control-Expose-Headers": "authorization"
    });
    next();
  }).catch(function (err) {
    next(_extends({ error: err }, _error2.default.TOKEN_EXPIRED));
  });
};

exports.default = isUserAuthenticated;