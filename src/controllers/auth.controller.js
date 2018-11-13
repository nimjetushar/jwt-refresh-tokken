import { Router } from "express";
import { loginUser, logout } from "../models/auth.model";
import { createUser } from "../models/user.model";

const router = Router();

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/logout", logout);

export default router;
