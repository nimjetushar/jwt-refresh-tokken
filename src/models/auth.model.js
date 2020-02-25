import jwt from "jsonwebtoken";

import errorObj from "../constant/error";
import config from "../config";
import encrypt from "../common/encrypt";
import Utils from "./utils.model";

class User {
  getUserCredentail(body) {
    return {
      username: body.username,
      password: body.password,
      loginTime: new Date().valueOf()
    };
  }
}

const tokenStack = {},
  secretKey = encrypt.secretKey,
  userModel = new User();

/**
 * logic to generate auth and reset token at same time
 * @param {*} reqObj
 * @returns
 */
function tokenCreationLogic(reqObj) {
  const promiseArr = [];

  promiseArr.push(
    Utils.jwtSign(reqObj, {
      expiresIn: config.auth_token_timeout,
      jwtid: `${reqObj.loginTime}`
    })
  );
  promiseArr.push(
    Utils.jwtSign(reqObj, { expiresIn: config.refresh_token_timeout })
  );
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

  Utils.findUser({ email: username })
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
// eslint-disable-next-line no-unused-vars
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
        const tokenData = tokenStack[token];

        if (tokenData) {
          const refreshData = Object.assign({}, tokenStack[token]),
            refreshToken = refreshData.refreshToken;

          jwt.verify(refreshToken, secretKey, (verifyErr, refreshDecoded) => {
            if (verifyErr) {
              return reject(verifyErr);
            }
            const reqObj = userModel.getUserCredentail(refreshDecoded),
              jwtOptions = {
                expiresIn: config.auth_token_timeout,
                jwtid: `${reqObj.loginTime}`
              };

            Utils.jwtSign(reqObj, jwtOptions)
              .then(authToken => {
                delete tokenStack[token];

                tokenStack[authToken] = Object.assign({}, refreshData, {
                  token: authToken
                });

                resolve(
                  Object.assign({}, refreshDecoded, {
                    token: authToken
                  })
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
