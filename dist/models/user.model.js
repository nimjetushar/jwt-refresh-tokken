"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createUser = createUser;

var _constants = require("../constant/constants");

var _utils = require("./utils.model");

var _utils2 = _interopRequireDefault(_utils);

var _user = require("../schema/user.schema");

var _user2 = _interopRequireDefault(_user);

var _error = require("../constant/error");

var _error2 = _interopRequireDefault(_error);

var _encrypt = require("../common/encrypt");

var _encrypt2 = _interopRequireDefault(_encrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(body) {
  _classCallCheck(this, User);

  this.user = {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role || _constants.USER_ROLE_REGULAR
  };
};

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
      userObj = new User(body).user,
      userData = new _user2.default(userObj);

  userData.validate(function (error) {
    if (error) {
      return next({
        error: error,
        status: 400,
        message: error.message
      });
    }

    _utils2.default.findUser({ email: body.email }).then(function (data) {
      if (data && data.length) {
        return next(_error2.default.USERNAME_EXIST);
      }
      _encrypt2.default.passwordEncryptionLogic(body.email, body.password).then(function (userPwd) {
        userObj.password = userPwd;

        _user2.default.create(userObj, function (err, user) {
          if (err) {
            return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
          }
          res.json({ message: user.name + " create successfully." });
        });
      }).catch(function (err) {
        return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
      });
    }).catch(function (err) {
      return next(_extends({ error: err }, _error2.default.INTERNAL_SERVER_ERROR));
    });
  });
}