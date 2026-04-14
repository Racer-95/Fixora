// ─────────────────────────────────────────────
//  FIXORA — Booking Repository
//  Extends BaseRepository with booking-specific queries
// ─────────────────────────────────────────────
import { BaseRepository } from "./base.repository.js";
import { Booking, IBookingDocument } from "../models/booking.model.js";
import type { BookingStatus } from "../types/entities.types.js";

class BookingRepository extends BaseRepository<IBookingDocument> {
  constructor() {
    super(Booking);
  }

  /** All bookings for a specific customer */
  async findByCustomer(customerId: string): Promise<IBookingDocument[]> {
    return this.model
      .find({ customerId })
      .populate("serviceId", "name category basePrice")
      .populate("providerId", "name email rating")
      .sort({ createdAt: -1 })
      .exec();
  }

  /** All bookings assigned to a provider */
  async findByProvider(providerId: string): Promise<IBookingDocument[]> {
    return this.model
      .find({ providerId })
      .populate("serviceId", "name category basePrice")
      .populate("customerId", "name email")
      .sort({ scheduledTime: 1 })
      .exec();
  }

  /** Filter bookings by status */
  async findByStatus(
    userId: string,
    role: "customer" | "provider",
    status: BookingStatus
  ): Promise<IBookingDocument[]> {
    const filter =
      role === "customer"
        ? { customerId: userId, status }
        : { providerId: userId, status };
    return this.model.find(filter).exec();
  }
}

// Singleton export
export const bookingRepository = new BookingRepository();
