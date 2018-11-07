import { verifyToken } from "../models/auth.model";
import errorObj from "../constant/error";

const isUserAuthenticated = function(req, res, next) {
  const token = req.headers["x-auth-token"];
  verifyToken(token)
    .then(tokendata => {
      const headerToken = tokendata.token;
      res.set({ "x-auth-token": headerToken });
      next();
    })
    .catch(err => {
      next({ error: err, ...errorObj.TOKEN_EXPIRED });
    });
};

export default isUserAuthenticated;
