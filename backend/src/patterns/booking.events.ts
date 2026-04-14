// ─────────────────────────────────────────────
//  FIXORA — Booking Event Emitter
//
//  PATTERN: Observer Pattern (via Node.js EventEmitter)
//  PURPOSE: Decouples side-effects from core booking logic.
//           When a booking changes state, BookingEvents
//           emits a typed event. Observers (listeners)
//           react independently — e.g., send notifications,
//           update provider rating, trigger payment, etc.
//
//  Booking lifecycle from UML:
//    pending → accepted / rejected → in_progress → completed / cancelled
// ─────────────────────────────────────────────
import EventEmitter from "events";
import type { IBookingDocument } from "../models/booking.model.js";

// ── Typed Event Map ───────────────────────────
interface BookingEventMap {
  "booking:created":   [booking: IBookingDocument];
  "booking:accepted":  [booking: IBookingDocument];
  "booking:rejected":  [booking: IBookingDocument];
  "booking:cancelled": [booking: IBookingDocument];
  "booking:completed": [booking: IBookingDocument];
}

// ── Typed EventEmitter subclass ───────────────
class BookingEventEmitter extends EventEmitter {
  /** Emit with full TypeScript type safety */
  emitEvent<K extends keyof BookingEventMap>(
    event: K,
    ...args: BookingEventMap[K]
  ): boolean {
    return this.emit(event, ...args);
  }

  /** Subscribe with full TypeScript type safety */
  onEvent<K extends keyof BookingEventMap>(
    event: K,
    listener: (...args: BookingEventMap[K]) => void
  ): this {
    return this.on(event, listener as (...args: any[]) => void);
  }
}

// ── Singleton Event Bus ───────────────────────
export const bookingEvents = new BookingEventEmitter();

// ─────────────────────────────────────────────
//  Register Observers (side-effect handlers)
//  Each listener is independent — adding/removing
//  one doesn't affect others (Open/Closed Principle).
// ─────────────────────────────────────────────

// Observer 1: Log all booking lifecycle changes
bookingEvents.onEvent("booking:created", (booking) => {
  console.log(`📅 [OBSERVER] Booking created: ${booking._id} — status: ${booking.status}`);
});

bookingEvents.onEvent("booking:accepted", (booking) => {
  console.log(`✅ [OBSERVER] Booking accepted: ${booking._id} — notify customer`);
  // TODO: trigger push notification / email to customer
});

bookingEvents.onEvent("booking:rejected", (booking) => {
  console.log(`❌ [OBSERVER] Booking rejected: ${booking._id} — notify customer`);
  // TODO: trigger refund if payment was made
});

bookingEvents.onEvent("booking:cancelled", (booking) => {
  console.log(`🚫 [OBSERVER] Booking cancelled: ${booking._id}`);
  // TODO: trigger cancellation email + refund process
});

bookingEvents.onEvent("booking:completed", (booking) => {
  console.log(`🏁 [OBSERVER] Booking completed: ${booking._id} — prompt review`);
  // TODO: prompt customer to leave a review
  //       update provider rating asynchronously
});
