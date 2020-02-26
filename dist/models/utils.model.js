"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require("../schema/user.schema");

var _user2 = _interopRequireDefault(_user);

var _error = require("../constant/error");

var _error2 = _interopRequireDefault(_error);

var _encrypt = require("../common/encrypt");

var _encrypt2 = _interopRequireDefault(_encrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secretKey = _encrypt2.default.secretKey;

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "findUser",

    /**
     * find the user into db based on the passed criteria
     * @param {*} userObj
     * @returns {Promise<any>}
     */
    value: function findUser(userObj) {
      return new Promise(function (resolve, reject) {
        _user2.default.find(userObj, function (err, user) {
          if (err) {
            return reject(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
          }
          return resolve(user);
        });
      });
    }

    /**
     * provides tokken based on authentication
     * @param {*} reqObj
     * @param {*} jwtConfig
     * @returns
     */

  }, {
    key: "jwtSign",
    value: function jwtSign(reqObj, jwtConfig) {
      return new Promise(function (resolve, reject) {
        _jsonwebtoken2.default.sign(reqObj, secretKey, jwtConfig, function (err, token) {
          if (err) {
            return reject(err);
          }
          return resolve(token);
        });
      });
    }
  }]);

  return Utils;
}();

exports.default = Utils;