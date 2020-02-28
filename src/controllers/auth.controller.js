import { Router } from "express";
import { loginUser, logout, verifyToken } from "../models/auth.model";
import { createUser } from "../models/user.model";
import errorObj from "../constant/error";

const router = Router();

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.post("/verify", (req, res, next) => {
    const token = req.headers.authorization;
    verifyToken(token)
        .then((tokendata) => {
            res.json(tokendata.token);
        }, err => {
            return next({ error: err, ...errorObj.TOKEN_EXPIRED });
        })
        .catch(err => {
            return next({ error: err, ...errorObj.TOKEN_EXPIRED });
        })
});

export default router;
