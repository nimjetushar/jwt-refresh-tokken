import { verifyToken } from "../models/auth.model";
import errorObj from "../constant/error";

const isUserAuthenticated = function (req, res, next) {
  const token = req.headers.authorization;

  verifyToken(token)
    .then(tokendata => {
      const headerToken = tokendata.token;

      res.set({
        authorization: headerToken,
        "Access-Control-Expose-Headers": "authorization"
      });
      next();
    })
    .catch(err => {
      next({ error: err, ...errorObj.TOKEN_EXPIRED });
    });
};

export default isUserAuthenticated;
