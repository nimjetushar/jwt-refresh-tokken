import { Router } from "express";
import isUserAuthenticated from "../middleware/auth.middleware";

const router = Router();

router.get("/", isUserAuthenticated, (req, res) => {
  res.json({ success: true });
});

export default router;
