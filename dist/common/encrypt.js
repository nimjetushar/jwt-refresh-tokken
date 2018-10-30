"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secretKey = undefined;
exports.passwordEncryptionLogic = passwordEncryptionLogic;
exports.verifyUserPassword = verifyUserPassword;

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var concatStr = "$-$",
    salt = 10;

var secretKey = exports.secretKey = "$any_rangom_key_as_per_choice$";

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

/**
 * Logic to encrypt the password
 * @param {string} username
 * @param {string} pwd
 * @returns {string}
 */
function passwordEncryptionLogic(username, pwd) {
  var baseConverted = baseConverter(username, pwd);
  return _bcryptjs2.default.hashSync(baseConverted, salt);
}

/**
 * verifies password
 * @param {string} username
 * @param {string} pwd
 * @param {string} dbPwd
 * @returns {boolean}
 */
function verifyUserPassword(username, pwd, dbPwd) {
  var pwdMerge = baseConverter(username, pwd);
  return _bcryptjs2.default.compareSync(pwdMerge, dbPwd);
}
//# sourceMappingURL=encrypt.js.map