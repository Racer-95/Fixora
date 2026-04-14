// ─────────────────────────────────────────────
//  FIXORA — Routes Index  (MODIFIED)
//  Central router — mounts all domain routes.
// ─────────────────────────────────────────────
import { Router } from "express";
import authRoutes    from "./auth.routes.js";
import bookingRoutes from "./booking.routes.js";
import serviceRoutes from "./service.routes.js";
import reviewRoutes  from "./review.routes.js";
import adminRoutes   from "./admin.routes.js";

const router = Router();

router.use("/auth",     authRoutes);     // POST /api/auth/register, /login
router.use("/bookings", bookingRoutes);  // POST /api/bookings, PATCH /api/bookings/:id/...
router.use("/services", serviceRoutes);  // GET  /api/services, POST /api/services
router.use("/reviews",  reviewRoutes);   // POST /api/reviews, GET  /api/reviews/provider/:id
router.use("/admin",    adminRoutes);    // GET  /api/admin/users, PATCH /api/admin/...

// Health check
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "Fixora API is running 🚀" });
});

export default router;