"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.verifyUser = verifyUser;
exports.resetPassword = resetPassword;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _utils = require("./utils.model");

var _utils2 = _interopRequireDefault(_utils);

var _error = require("../constant/error");

var _error2 = _interopRequireDefault(_error);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _encrypt = require("../common/encrypt");

var _encrypt2 = _interopRequireDefault(_encrypt);

var _user = require("../schema/user.schema");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyUser(_ref, res, next) {
  var body = _ref.body;
  var email = body.email,
      reqObj = { email: email };


  _utils2.default.findUser(reqObj).then(function (data) {
    if (data && data.length) {
      _utils2.default.jwtSign(reqObj, { expiresIn: _config2.default.reset_token_timeout }).then(function (token) {
        res.json({ resetToken: token, email: email });
      }).catch(function (err) {
        next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
      });
    } else {
      return next(_error2.default.USERNAME_DONT_EXIST);
    }
  }).catch(function (err) {
    return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
  });
}

function resetPassword(_ref2, res, next) {
  var body = _ref2.body;
  var resetToken = body.resetToken,
      password = body.password,
      confirmPassword = body.confirmPassword,
      email = body.email;


  _jsonwebtoken2.default.verify(resetToken, _encrypt2.default.secretKey, function (err) {
    if (err) {
      return next(_error2.default.TOKEN_EXPIRED);
    }

    if (password !== confirmPassword) {
      return next(_error2.default.PASSWORD_DOES_NOT_MATCH);
    }

    _user2.default.findOne({ email: email }, function (findErr, user) {
      if (findErr) {
        return next(_extends({ error: findErr }, _error2.default.INTERNAL_SERVER_ERROR));
      }
      if (!user) {
        return next(_error2.default.BAD_REQUEST);
      }
      _encrypt2.default.passwordEncryptionLogic(body.email, body.password).then(function (encrytedPwd) {
        user.password = encrytedPwd;

        user.save(function (saveErr) {
          if (saveErr) {
            return next(_extends({ error: saveErr }, _error2.default.ERROR_ON_UPDATE));
          }
          res.json({ message: "password updated successfully" });
        });
      }, function (encryptErr) {
        next(_extends({ error: encryptErr }, _error2.default.INTERNAL_SERVER_ERROR));
      });
    });
  });
}