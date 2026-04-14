// ─────────────────────────────────────────────
//  FIXORA — Booking Routes
//  Protected: all routes require auth.
//  Role-specific actions use roleGuard().
// ─────────────────────────────────────────────
import { Router } from "express";
import {
  createBooking,
  getMyBookings,
  acceptBooking,
  rejectBooking,
  updateBookingStatus,
  cancelBooking,
} from "../controllers/booking.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleGuard } from "../middleware/role.middleware.js";

const router = Router();

// All booking routes require authentication
router.use(authMiddleware);

// Customer: bookService(), viewBookings()
router.post("/",            roleGuard("customer"),           createBooking);
router.get("/my",                                            getMyBookings);       // works for both customer & provider
router.patch("/:id/cancel", roleGuard("customer"),           cancelBooking);

// Provider: acceptBooking(), rejectBooking(), updateStatus()
router.patch("/:id/accept", roleGuard("provider"),           acceptBooking);
router.patch("/:id/reject", roleGuard("provider"),           rejectBooking);
router.patch("/:id/status", roleGuard("provider", "admin"),  updateBookingStatus);

export default router;
