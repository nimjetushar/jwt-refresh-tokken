"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.loginUser = loginUser;
exports.logout = logout;
exports.verifyToken = verifyToken;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _error = require("../constant/error");

var _error2 = _interopRequireDefault(_error);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _encrypt = require("../common/encrypt");

var _encrypt2 = _interopRequireDefault(_encrypt);

var _utils = require("./utils.model");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: "getUserCredentail",
    value: function getUserCredentail(body) {
      return {
        username: body.username,
        password: body.password,
        loginTime: new Date().valueOf()
      };
    }
  }]);

  return User;
}();

var tokenStack = {},
    secretKey = _encrypt2.default.secretKey,
    userModel = new User();

/**
 * logic to generate auth and reset token at same time
 * @param {*} reqObj
 * @returns
 */
function tokenCreationLogic(reqObj) {
  var promiseArr = [];

  promiseArr.push(_utils2.default.jwtSign(reqObj, {
    expiresIn: _config2.default.auth_token_timeout,
    jwtid: "" + reqObj.loginTime
  }));
  promiseArr.push(_utils2.default.jwtSign(reqObj, { expiresIn: _config2.default.refresh_token_timeout }));
  return Promise.all(promiseArr);
}

/**
 * finds the user and verifies the user details and
 * returns valid JWT tokken to user
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function loginUser(req, res, next) {
  var reqObj = userModel.getUserCredentail(req.body),
      username = reqObj.username,
      password = reqObj.password;


  _utils2.default.findUser({ email: username }).then(function (data) {
    if (data && data.length) {
      var userDetail = data[0];

      _encrypt2.default.verifyUserPassword(username, password, userDetail.password).then(function () {
        tokenCreationLogic(reqObj).then(function (tokenData) {
          var authToken = tokenData[0],
              refreshToken = tokenData[1],
              responsObj = {
            email: userDetail.email,
            name: userDetail.name,
            role: userDetail.role,
            token: authToken,
            loginTime: reqObj.loginTime
          };

          tokenStack[authToken] = Object.assign({}, responsObj, {
            refreshToken: refreshToken
          });
          res.json(responsObj);
        }).catch(function () {
          return next(_error2.default.INTERNAL_SERVER_ERROR);
        });
      }).catch(function () {
        return next(_error2.default.INVALID_PASSWORD);
      });
    } else {
      return next(_error2.default.INVAILD_USERNAME);
    }
  }).catch(function (err) {
    return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
  });
}

/**
 * deletes the entry from the token stack
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
function logout(req, res, next) {
  var authToken = req.headers.authorization;

  delete tokenStack[authToken];
  res.json({ logout: true });
}

/**
 * verify the auth token if expired verify for refresh token and based on
 * that generated new auth token
 * @export
 * @param {*} token
 * @returns
 */
function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.verify(token, secretKey, function (err, authDecoded) {
      if (err) {
        var tokenData = tokenStack[token];

        if (tokenData) {
          var refreshData = Object.assign({}, tokenStack[token]),
              refreshToken = refreshData.refreshToken;

          _jsonwebtoken2.default.verify(refreshToken, secretKey, function (verifyErr, refreshDecoded) {
            if (verifyErr) {
              return reject(verifyErr);
            }
            var reqObj = userModel.getUserCredentail(refreshDecoded),
                jwtOptions = {
              expiresIn: _config2.default.auth_token_timeout,
              jwtid: "" + reqObj.loginTime
            };

            _utils2.default.jwtSign(reqObj, jwtOptions).then(function (authToken) {
              delete tokenStack[token];

              tokenStack[authToken] = Object.assign({}, refreshData, {
                token: authToken
              });

              resolve(Object.assign({}, refreshDecoded, {
                token: authToken
              }));
            }).catch(function (signErr) {
              reject(signErr);
            });
          });
        } else {
          reject(err);
        }
      } else {
        resolve(Object.assign({}, authDecoded, { token: token }));
      }
    });
  });
}