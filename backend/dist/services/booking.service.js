// ─────────────────────────────────────────────
//  FIXORA — Booking Service
//
//  PATTERN: Service Layer
//  Implements all booking operations from the UML:
//    Customer: bookService(), viewBookings()
//    Provider: acceptBooking(), rejectBooking(), updateStatus()
//    Admin:    handleDisputes()
//
//  Uses: bookingRepository (Repository Pattern)
//        bookingEvents (Observer Pattern)
// ─────────────────────────────────────────────
import { bookingRepository } from "../repositories/booking.repository.js";
import { bookingEvents } from "../patterns/booking.events.js";
// ── Service Implementation ────────────────────
class BookingService {
    /** Customer.bookService() — creates a pending booking */
    async createBooking(customerId, data) {
        const booking = await bookingRepository.create({
            customerId,
            providerId: data.providerId,
            serviceId: data.serviceId,
            scheduledTime: new Date(data.scheduledTime),
            status: "pending",
        });
        // Observer Pattern — fire event, listeners react independently
        bookingEvents.emitEvent("booking:created", booking);
        return booking;
    }
    /** Customer.viewBookings() */
    async getCustomerBookings(customerId) {
        return bookingRepository.findByCustomer(customerId);
    }
    /** Provider.viewBookings() */
    async getProviderBookings(providerId) {
        return bookingRepository.findByProvider(providerId);
    }
    /** Provider.acceptBooking() */
    async acceptBooking(providerId, bookingId) {
        const booking = await bookingRepository.findById(bookingId);
        if (!booking)
            throw new Error("Booking not found.");
        if (booking.providerId.toString() !== providerId)
            throw new Error("Unauthorized.");
        if (booking.status !== "pending")
            throw new Error("Only pending bookings can be accepted.");
        const updated = await bookingRepository.updateById(bookingId, { status: "accepted" });
        bookingEvents.emitEvent("booking:accepted", updated);
        return updated;
    }
    /** Provider.rejectBooking() */
    async rejectBooking(providerId, bookingId) {
        const booking = await bookingRepository.findById(bookingId);
        if (!booking)
            throw new Error("Booking not found.");
        if (booking.providerId.toString() !== providerId)
            throw new Error("Unauthorized.");
        if (booking.status !== "pending")
            throw new Error("Only pending bookings can be rejected.");
        const updated = await bookingRepository.updateById(bookingId, { status: "rejected" });
        bookingEvents.emitEvent("booking:rejected", updated);
        return updated;
    }
    /** Provider.updateStatus() — in_progress → completed */
    async updateStatus(bookingId, data) {
        const booking = await bookingRepository.findById(bookingId);
        if (!booking)
            throw new Error("Booking not found.");
        const updated = await bookingRepository.updateById(bookingId, { status: data.status });
        if (data.status === "completed") {
            bookingEvents.emitEvent("booking:completed", updated);
        }
        return updated;
    }
    /** Customer.cancelBooking() — only pending/accepted can be cancelled */
    async cancelBooking(userId, bookingId) {
        const booking = await bookingRepository.findById(bookingId);
        if (!booking)
            throw new Error("Booking not found.");
        if (booking.customerId.toString() !== userId)
            throw new Error("Unauthorized.");
        const cancellable = ["pending", "accepted"];
        if (!cancellable.includes(booking.status)) {
            throw new Error("This booking cannot be cancelled.");
        }
        const updated = await bookingRepository.updateById(bookingId, { status: "cancelled" });
        bookingEvents.emitEvent("booking:cancelled", updated);
        return updated;
    }
}
// Singleton export
export const bookingService = new BookingService();
//# sourceMappingURL=booking.service.js.map