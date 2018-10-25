import bcrypt from "bcryptjs";

const concatStr = "$-$",
  salt = 10;

export const secretKey = "$any_rangom_key_as_per_choice$";

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

/**
 * Logic to encrypt the password
 * @param {string} username
 * @param {string} pwd
 * @returns {string}
 */
export function passwordEncryptionLogic(username, pwd) {
  const baseConverted = baseConverter(username, pwd);
  return bcrypt.hashSync(baseConverted, salt);
}

/**
 * verifies password
 * @param {string} username
 * @param {string} pwd
 * @param {string} dbPwd
 * @returns {boolean}
 */
export function verifyUserPassword(username, pwd, dbPwd) {
  const pwdMerge = baseConverter(username, pwd);
  return bcrypt.compareSync(pwdMerge, dbPwd);
}