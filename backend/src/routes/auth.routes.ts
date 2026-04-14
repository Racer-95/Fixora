// ─────────────────────────────────────────────
//  FIXORA — Auth Routes  (MODIFIED)
// ─────────────────────────────────────────────
import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);   // User.login() (creates + authenticates)
router.post("/login",    login);       // User.login()
router.get("/profile",  authMiddleware, getProfile); // User.updateProfile() stub

export default router;