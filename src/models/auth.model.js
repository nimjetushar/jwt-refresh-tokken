import jwt from "jsonwebtoken";

import UserModel from "../schema/user.schema";
import { USER_ROLE_REGULAR } from "../constant/constants";
import errorObj from "../constant/error";
import config from "../config.json";
import encrypt from "../common/encrypt";
import User from "./user.model";

const tokenStack = {},
  userModel = new User(),
  secretKey = encrypt.secretKey;

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
    userData = new UserModel(userObj),
    error = userData.validateSync();

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
      encrypt
        .passwordEncryptionLogic(body.email, body.password)
        .then(userPwd => {
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
    })
    .catch(err => {
      return next({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
    });
}

/**
 * provides tokken based on authentication
 * @param {*} reqObj
 * @param {*} jwtConfig
 * @returns
 */
function jwtSign(reqObj, jwtConfig) {
  return new Promise((resolve, reject) => {
    jwt.sign(reqObj, secretKey, jwtConfig, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
}

/**
 * logic to generate auth and reset token at same time
 * @param {*} reqObj
 * @returns
 */
function tokenCreationLogic(reqObj) {
  const promiseArr = [];

  promiseArr.push(
    jwtSign(reqObj, {
      expiresIn: config.auth_token_timeout,
      jwtid: `${reqObj.loginTime}`
    })
  );
  promiseArr.push(jwtSign(reqObj, { expiresIn: config.refresh_token_timeout }));
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
export function loginUser(req, res, next) {
  const reqObj = userModel.getUserCredentail(req.body),
    { username, password } = reqObj;

  findUser({ email: username })
    .then(data => {
      if (data && data.length) {
        const userDetail = data[0];

        encrypt
          .verifyUserPassword(username, password, userDetail.password)
          .then(() => {
            tokenCreationLogic(reqObj)
              .then(tokenData => {
                const authToken = tokenData[0],
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
              })
              .catch(() => {
                return next(errorObj.INTERNAL_SERVER_ERROR);
              });
          })
          .catch(() => {
            return next(errorObj.INVALID_PASSWORD);
          });
      } else {
        return next(errorObj.INVAILD_USERNAME);
      }
    })
    .catch(err => {
      return next({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
    });
}

/**
 * deletes the entry from the token stack
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function logout(req, res, next) {
  const authToken = req.headers.authorization;

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
export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, authDecoded) => {
      if (err) {
        const refreshData = tokenStack[token];

        if (refreshData) {
          const refreshToken = refreshData.refreshToken;

          jwt.verify(refreshToken, secretKey, (verifyErr, refreshDecoded) => {
            if (verifyErr) {
              return reject(verifyErr);
            }
            const reqObj = userModel.getUserCredentail(refreshDecoded),
              jwtOptions = {
                expiresIn: config.auth_token_timeout,
                jwtid: `${reqObj.loginTime}`
              };

            jwtSign(reqObj, jwtOptions)
              .then(authToken => {
                resolve(
                  Object.assign({}, refreshDecoded, { token: authToken })
                );
              })
              .catch(signErr => {
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
