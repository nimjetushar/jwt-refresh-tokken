"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createUser = createUser;
exports.authenticateUser = authenticateUser;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require("../schema/user.schema");

var _user2 = _interopRequireDefault(_user);

var _constants = require("../constant/constants");

var _error = require("../constant/error");

var _error2 = _interopRequireDefault(_error);

var _encrypt = require("../common/encrypt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * find the user into db based on the passed criteria
 * @param {*} userObj
 * @returns {Promise<any>}
 */
function findUser(userObj) {
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
 * verify the user object received and then saves the user onto the db
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
function createUser(req, res, next) {
  var body = req.body,
      userObj = {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role || _constants.USER_ROLE_REGULAR
  },
      userData = new _user2.default(userObj);

  var error = userData.validateSync();
  if (error) {
    return next({
      error: error,
      status: 400,
      message: error.message
    });
  }

  findUser({ email: body.email }).then(function (data) {
    if (data && data.length) {
      return next(_error2.default.USERNAME_EXIST);
    }
    var userPwd = (0, _encrypt.passwordEncryptionLogic)(body.email, body.password);
    userObj.password = userPwd;

    _user2.default.create(userObj, function (err, user) {
      if (err) {
        return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
      }
      res.json(user);
    });
  }).catch(function (err) {
    return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
  });
}

/**
 * finds the user and verifies the user details and
 * returns valid JWT tokken to user
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function authenticateUser(req, res, next) {
  var body = req.body;
  var username = body.username,
      password = body.password;


  findUser({ email: username }).then(function (data) {
    if (data && data.length) {
      var userDetail = data[0];
      var status = (0, _encrypt.verifyUserPassword)(username, password, userDetail.password);
      if (status) {
        var tokken = _jsonwebtoken2.default.sign(body, _encrypt.secretKey);
        res.json({
          email: userDetail.email,
          name: userDetail.name,
          role: userDetail.role,
          tokken: tokken
        });
      } else {
        return next(_error2.default.INVALID_PASSWORD);
      }
    } else {
      return next(_error2.default.INVAILD_USERNAME);
    }
  }).catch(function (err) {
    return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
  });
}
//# sourceMappingURL=auth.model.js.map