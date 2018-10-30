import { Router } from "express";
import { createUser, authenticateUser, logout } from "../models/auth.model";

const router = Router();

router.post("/create", createUser);

router.post("/login", authenticateUser);

router.get("/logout", logout);

export default router;
