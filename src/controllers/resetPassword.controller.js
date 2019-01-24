import { Router } from "express";
import { resetPassword, verifyUser } from "../models/resetPassword.model";

const router = Router();

router.post("/verifyUser", verifyUser);

router.put("/password", resetPassword);

export default router;
