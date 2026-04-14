import type { Request, Response } from "express";
/** POST /api/bookings — Customer.bookService() */
export declare const createBooking: (req: Request, res: Response) => Promise<void>;
/** GET /api/bookings/my — Customer.viewBookings() / Provider.viewBookings() */
export declare const getMyBookings: (req: Request, res: Response) => Promise<void>;
/** PATCH /api/bookings/:id/accept — Provider.acceptBooking() */
export declare const acceptBooking: (req: Request, res: Response) => Promise<void>;
/** PATCH /api/bookings/:id/reject — Provider.rejectBooking() */
export declare const rejectBooking: (req: Request, res: Response) => Promise<void>;
/** PATCH /api/bookings/:id/status — Provider.updateStatus() */
export declare const updateBookingStatus: (req: Request, res: Response) => Promise<void>;
/** PATCH /api/bookings/:id/cancel — Booking.cancelBooking() */
export declare const cancelBooking: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=booking.controller.d.ts.map