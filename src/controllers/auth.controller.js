import { Router } from "express";
import { createUser, loginUser, logout } from "../models/auth.model";

const router = Router();

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/logout", logout);

export default router;
