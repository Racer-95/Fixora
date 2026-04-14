// ─────────────────────────────────────────────
//  FIXORA — Booking Repository
//  Extends BaseRepository with booking-specific queries
// ─────────────────────────────────────────────
import { BaseRepository } from "./base.repository.js";
import { Booking } from "../models/booking.model.js";
class BookingRepository extends BaseRepository {
    constructor() {
        super(Booking);
    }
    /** All bookings for a specific customer */
    async findByCustomer(customerId) {
        return this.model
            .find({ customerId })
            .populate("serviceId", "name category basePrice")
            .populate("providerId", "name email rating")
            .sort({ createdAt: -1 })
            .exec();
    }
    /** All bookings assigned to a provider */
    async findByProvider(providerId) {
        return this.model
            .find({ providerId })
            .populate("serviceId", "name category basePrice")
            .populate("customerId", "name email")
            .sort({ scheduledTime: 1 })
            .exec();
    }
    /** Filter bookings by status */
    async findByStatus(userId, role, status) {
        const filter = role === "customer"
            ? { customerId: userId, status }
            : { providerId: userId, status };
        return this.model.find(filter).exec();
    }
}
// Singleton export
export const bookingRepository = new BookingRepository();
//# sourceMappingURL=booking.repository.js.map