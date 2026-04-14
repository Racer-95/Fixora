// ─────────────────────────────────────────────
//  FIXORA — Admin Routes
//  All routes: auth + admin-only guard.
// ─────────────────────────────────────────────
import { Router } from "express";
import { getAllUsers, getPendingProviders, approveProvider, handleDispute, removeUser, } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleGuard } from "../middleware/role.middleware.js";
const router = Router();
// All admin routes require auth + admin role
router.use(authMiddleware, roleGuard("admin"));
router.get("/users", getAllUsers); // Admin.manageUsers()
router.get("/providers/pending", getPendingProviders);
router.patch("/providers/:id/approve", approveProvider); // Admin.approveProvider()
router.patch("/disputes/:bookingId/resolve", handleDispute); // Admin.handleDisputes()
router.delete("/users/:id", removeUser); // Admin.removeUser(userId)
export default router;
//# sourceMappingURL=admin.routes.js.map