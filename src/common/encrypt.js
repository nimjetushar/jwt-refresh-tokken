import bcrypt from "bcryptjs";

const concatStr = "$-$",
  salt = 10;

/**
 * custom logic for first level of encryption
 * @param {string} username
 * @param {string} pwd
 * @returns {string}
 */
function baseConverter(username, pwd) {
  const joinedStr = `${username}${concatStr}${pwd}`;
  return Buffer.from(joinedStr).toString("base64");
}

export default class Encrypt {
  static secretKey = "$any_rangom_key_as_per_choice$";

  /**
   * Logic to encrypt the password
   * @param {string} username
   * @param {string} pwd
   * @returns {Promise}
   */
  static passwordEncryptionLogic(username, pwd) {
    return new Promise(function(resolve, reject) {
      const baseConverted = baseConverter(username, pwd);
      bcrypt.hash(baseConverted, salt, function(err, hash) {
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
  static verifyUserPassword(username, pwd, dbPwd) {
    return new Promise(function(resolve, reject) {
      const pwdMerge = baseConverter(username, pwd);
      bcrypt.compare(pwdMerge, dbPwd, function(err, res) {
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
}
