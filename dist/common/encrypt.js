"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var concatStr = "$-$",
    salt = 10;

/**
 * custom logic for first level of encryption
 * @param {string} username
 * @param {string} pwd
 * @returns {string}
 */
function baseConverter(username, pwd) {
  var joinedStr = "" + username + concatStr + pwd;

  return Buffer.from(joinedStr).toString("base64");
}

var Encrypt = function () {
  function Encrypt() {
    _classCallCheck(this, Encrypt);
  }

  _createClass(Encrypt, null, [{
    key: "passwordEncryptionLogic",


    /**
     * Logic to encrypt the password
     * @param {string} username
     * @param {string} pwd
     * @returns {Promise}
     */
    value: function passwordEncryptionLogic(username, pwd) {
      return new Promise(function (resolve, reject) {
        var baseConverted = baseConverter(username, pwd);

        _bcryptjs2.default.hash(baseConverted, salt, function (err, hash) {
          if (err) {
            return reject(err);
          }
          return resolve(hash);
        });
      });
    }

    /**
     * verifies password
     * @param {string} username
     * @param {string} pwd
     * @param {string} dbPwd
     * @returns {Promise}
     */

  }, {
    key: "verifyUserPassword",
    value: function verifyUserPassword(username, pwd, dbPwd) {
      return new Promise(function (resolve, reject) {
        var pwdMerge = baseConverter(username, pwd);

        _bcryptjs2.default.compare(pwdMerge, dbPwd, function (err, res) {
          if (err) {
            return reject(err);
          }
          if (res) {
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    }
  }]);

  return Encrypt;
}();

Encrypt.secretKey = "$any_rangom_key_as_per_choice$";
exports.default = Encrypt;