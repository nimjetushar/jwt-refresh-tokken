import Utils from "./utils.model";
import errorObj from "../constant/error";
import config from "../config.json";

export function verifyUser(req, res, next) {
  const { body } = req,
    { email } = body,
    reqObj = { email: email };

  Utils.findUser(reqObj)
    .then(data => {
      if (data && data.length) {
        Utils.jwtSign(reqObj, { expiresIn: config.reset_token_timeout })
          .then(token => {
            res.json({ resetToken: token, email: email });
          })
          .catch(err => {
            next({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
          });
      } else {
        return next(errorObj.USERNAME_DONT_EXIST);
      }
    })
    .catch(err => {
      return next({ error: err, ...errorObj.INTERNAL_SERVER_ERROR });
    });
}

export function resetPassword(req, res, next) {}
