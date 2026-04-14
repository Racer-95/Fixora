// ─────────────────────────────────────────────
//  FIXORA — Review Routes
//  Read is public. Mutations require customer role.
// ─────────────────────────────────────────────
import { Router } from "express";
import { addReview, editReview, deleteReview, getProviderReviews, } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleGuard } from "../middleware/role.middleware.js";
const router = Router();
// Public: get reviews for a provider
router.get("/provider/:providerId", getProviderReviews);
// Customer-only: Review.addReview(), editReview(), deleteReview()
router.post("/", authMiddleware, roleGuard("customer"), addReview);
router.patch("/:id", authMiddleware, roleGuard("customer"), editReview);
router.delete("/:id", authMiddleware, roleGuard("customer"), deleteReview);
export default router;
//# sourceMappingURL=review.routes.js.map