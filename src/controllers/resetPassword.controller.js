import { Router } from "express";
import { resetPassword, verifyUser } from "../models/resetPassword.model";

const router = Router();

router.get("/verifyUser", verifyUser);

router.get("/password", resetPassword);

export default router;
