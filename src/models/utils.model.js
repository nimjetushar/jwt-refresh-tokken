import jwt from "jsonwebtoken";

import UserModel from "../schema/user.schema";
import errorObj from "../constant/error";
import Encrypt from "../common/encrypt";

const secretKey = Encrypt.secretKey;

export default class Utils {
  /**
   * find the user into db based on the passed criteria
   * @param {*} userObj
   * @returns {Promise<any>}
   */
  static findUser(userObj) {
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
   * provides tokken based on authentication
   * @param {*} reqObj
   * @param {*} jwtConfig
   * @returns
   */
  static jwtSign(reqObj, jwtConfig) {
    return new Promise((resolve, reject) => {
      jwt.sign(reqObj, secretKey, jwtConfig, (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      });
    });
  }
}
