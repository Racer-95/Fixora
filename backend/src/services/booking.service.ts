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
import type { IBookingDocument } from "../models/booking.model.js";
import type { CreateBookingDTO, UpdateBookingStatusDTO } from "../types/dto.types.js";
import type { BookingStatus } from "../types/entities.types.js";

// ── Service Contract ──────────────────────────
interface IBookingService {
  createBooking(customerId: string, data: CreateBookingDTO): Promise<IBookingDocument>;
  getCustomerBookings(customerId: string): Promise<IBookingDocument[]>;
  getProviderBookings(providerId: string): Promise<IBookingDocument[]>;
  acceptBooking(providerId: string, bookingId: string): Promise<IBookingDocument>;
  rejectBooking(providerId: string, bookingId: string): Promise<IBookingDocument>;
  updateStatus(bookingId: string, data: UpdateBookingStatusDTO): Promise<IBookingDocument>;
  cancelBooking(userId: string, bookingId: string): Promise<IBookingDocument>;
}

// ── Service Implementation ────────────────────
class BookingService implements IBookingService {

  /** Customer.bookService() — creates a pending booking */
  async createBooking(customerId: string, data: CreateBookingDTO): Promise<IBookingDocument> {
    const booking = await bookingRepository.create({
      customerId,
      providerId:    data.providerId,
      serviceId:     data.serviceId,
      scheduledTime: new Date(data.scheduledTime),
      status:        "pending",
    } as any);

    // Observer Pattern — fire event, listeners react independently
    bookingEvents.emitEvent("booking:created", booking);
    return booking;
  }

  /** Customer.viewBookings() */
  async getCustomerBookings(customerId: string): Promise<IBookingDocument[]> {
    return bookingRepository.findByCustomer(customerId);
  }

  /** Provider.viewBookings() */
  async getProviderBookings(providerId: string): Promise<IBookingDocument[]> {
    return bookingRepository.findByProvider(providerId);
  }

  /** Provider.acceptBooking() */
  async acceptBooking(providerId: string, bookingId: string): Promise<IBookingDocument> {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) throw new Error("Booking not found.");
    if (booking.providerId.toString() !== providerId) throw new Error("Unauthorized.");
    if (booking.status !== "pending") throw new Error("Only pending bookings can be accepted.");

    const updated = await bookingRepository.updateById(bookingId, { status: "accepted" });
    bookingEvents.emitEvent("booking:accepted", updated!);
    return updated!;
  }

  /** Provider.rejectBooking() */
  async rejectBooking(providerId: string, bookingId: string): Promise<IBookingDocument> {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) throw new Error("Booking not found.");
    if (booking.providerId.toString() !== providerId) throw new Error("Unauthorized.");
    if (booking.status !== "pending") throw new Error("Only pending bookings can be rejected.");

    const updated = await bookingRepository.updateById(bookingId, { status: "rejected" });
    bookingEvents.emitEvent("booking:rejected", updated!);
    return updated!;
  }

  /** Provider.updateStatus() — in_progress → completed */
  async updateStatus(bookingId: string, data: UpdateBookingStatusDTO): Promise<IBookingDocument> {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) throw new Error("Booking not found.");

    const updated = await bookingRepository.updateById(bookingId, { status: data.status });

    if (data.status === "completed") {
      bookingEvents.emitEvent("booking:completed", updated!);
    }
    return updated!;
  }

  /** Customer.cancelBooking() — only pending/accepted can be cancelled */
  async cancelBooking(userId: string, bookingId: string): Promise<IBookingDocument> {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) throw new Error("Booking not found.");
    if (booking.customerId.toString() !== userId) throw new Error("Unauthorized.");

    const cancellable: BookingStatus[] = ["pending", "accepted"];
    if (!cancellable.includes(booking.status)) {
      throw new Error("This booking cannot be cancelled.");
    }

    const updated = await bookingRepository.updateById(bookingId, { status: "cancelled" });
    bookingEvents.emitEvent("booking:cancelled", updated!);
    return updated!;
  }
}

// Singleton export
export const bookingService = new BookingService();
