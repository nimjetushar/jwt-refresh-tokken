import { Router } from "express";
import { createUser, authenticateUser } from "../models/auth.model";

const router = Router();

router.post("/create", createUser);

router.post("/login", authenticateUser);

export default router;
