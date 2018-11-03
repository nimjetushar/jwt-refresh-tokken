import { verifyToken } from "../models/auth.model";
import errorObj from "../constant/error";

const isUserAuthenticated = function(req, res, next) {
  const token = "";
  verifyToken(token)
    .then(res => {
      next();
    })
    .catch(err => {
      next({ error: err, ...errorObj.TOKEN_EXPIRED });
    });
};

export default isUserAuthenticated;
