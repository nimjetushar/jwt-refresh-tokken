import jwt from "jsonwebtoken";

import UserModel from "../schema/user.schema";
import { USER_ROLE_REGULAR } from "../constant/constants";
import errorObj from "../constant/error";

import {
  passwordEncryptionLogic,
  verifyUserPassword,
  secretKey
} from "../common/encrypt";

/**
 * find the user into db based on the passed criteria
 * @param {*} userObj
 * @returns {Promise<any>}
 */
function findUser(userObj) {
  return new Promise((resolve, reject) => {
    UserModel.find(userObj, (err, user) => {
      if (err) {
        return reject({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
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
export function createUser(req, res, next) {
  const body = req.body,
    userObj = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || USER_ROLE_REGULAR
    },
    userData = new UserModel(userObj);

  const error = userData.validateSync();
  if (error) {
    return next({
      error: error,
      status: 400,
      message: error.message
    });
  }

  findUser({ email: body.email })
    .then(data => {
      if (data && data.length) {
        return next(errorObj.USERNAME_EXIST);
      }
      const userPwd = passwordEncryptionLogic(body.email, body.password);
      userObj.password = userPwd;

      UserModel.create(userObj, (err, user) => {
        if (err) {
          return next({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
        }
        res.json(user);
      });
    })
    .catch(err => {
      return next({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
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
export function authenticateUser(req, res, next) {
  const body = req.body;
  const { username, password } = body;

  findUser({ email: username })
    .then(data => {
      if (data && data.length) {
        const userDetail = data[0];
        const status = verifyUserPassword(
          username,
          password,
          userDetail.password
        );
        if (status) {
          const tokken = jwt.sign(body, secretKey);
          res.json({
            email: userDetail.email,
            name: userDetail.name,
            role: userDetail.role,
            tokken: tokken
          });
        } else {
          return next(errorObj.INVALID_PASSWORD);
        }
      } else {
        return next(errorObj.INVAILD_USERNAME);
      }
    })
    .catch(err => {
      return next({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
    });
}
