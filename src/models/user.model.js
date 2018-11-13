import { USER_ROLE_REGULAR } from "../constant/constants";
import Utils from "./utils.model";
import UserModel from "../schema/user.schema";
import errorObj from "../constant/error";
import Encrypt from "../common/encrypt";

class User {
  constructor(body) {
    this.user = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || USER_ROLE_REGULAR
    };
  }
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
    userObj = new User(body).user,
    userData = new UserModel(userObj);

  userData.validate(error => {
    if (error) {
      return next({
        error: error,
        status: 400,
        message: error.message
      });
    }

    Utils.findUser({ email: body.email })
      .then(data => {
        if (data && data.length) {
          return next(errorObj.USERNAME_EXIST);
        }
        Encrypt
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
  });
}
