import { bookingService } from "../services/booking.service.js";
/** Helper: Express req.params values are string | string[] — assert string */
const param = (v) => (Array.isArray(v) ? v[0] : v);
/** POST /api/bookings — Customer.bookService() */
export const createBooking = async (req, res) => {
    try {
        const data = req.body;
        const booking = await bookingService.createBooking(req.user.id, data);
        res.status(201).json({ success: true, data: booking });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** GET /api/bookings/my — Customer.viewBookings() / Provider.viewBookings() */
export const getMyBookings = async (req, res) => {
    try {
        const role = req.user.role;
        const bookings = role === "customer"
            ? await bookingService.getCustomerBookings(req.user.id)
            : await bookingService.getProviderBookings(req.user.id);
        res.json({ success: true, data: bookings });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** PATCH /api/bookings/:id/accept — Provider.acceptBooking() */
export const acceptBooking = async (req, res) => {
    try {
        const booking = await bookingService.acceptBooking(req.user.id, param(req.params["id"]));
        res.json({ success: true, data: booking });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** PATCH /api/bookings/:id/reject — Provider.rejectBooking() */
export const rejectBooking = async (req, res) => {
    try {
        const booking = await bookingService.rejectBooking(req.user.id, param(req.params["id"]));
        res.json({ success: true, data: booking });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** PATCH /api/bookings/:id/status — Provider.updateStatus() */
export const updateBookingStatus = async (req, res) => {
    try {
        const data = req.body;
        const booking = await bookingService.updateStatus(param(req.params["id"]), data);
        res.json({ success: true, data: booking });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** PATCH /api/bookings/:id/cancel — Booking.cancelBooking() */
export const cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.cancelBooking(req.user.id, param(req.params["id"]));
        res.json({ success: true, data: booking });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
//# sourceMappingURL=booking.controller.js.map