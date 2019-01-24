import jwt from "jsonwebtoken";
import Utils from "./utils.model";
import errorObj from "../constant/error";
import config from "../config.json";
import Encrypt from "../common/encrypt";
import UserSchema from "../schema/user.schema";

export function verifyUser({ body }, res, next) {
  const { email } = body,
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

export function resetPassword({ body }, res, next) {
  const { resetToken, password, confirmPassword, email } = body;

  jwt.verify(resetToken, Encrypt.secretKey, err => {
    if (err) {
      return next(errorObj.TOKEN_EXPIRED);
    }

    if (password !== confirmPassword) {
      return next(errorObj.PASSWORD_DOES_NOT_MATCH);
    }

    UserSchema.findOne({ email: email }, (findErr, user) => {
      if (findErr) {
        return next({ error: findErr, ...errorObj.INTERNAL_SERVER_ERROR });
      }
      if (!user) {
        return next(errorObj.BAD_REQUEST);
      }
      Encrypt.passwordEncryptionLogic(body.email, body.password).then(
        encrytedPwd => {
          user.password = encrytedPwd;

          user.save(saveErr => {
            if (saveErr) {
              return next({ error: saveErr, ...errorObj.ERROR_ON_UPDATE });
            }
            res.json({ message: "password updated successfully" });
          });
        },
        encryptErr => {
          next({ error: encryptErr, ...errorObj.INTERNAL_SERVER_ERROR });
        }
      );
    });
  });
}
