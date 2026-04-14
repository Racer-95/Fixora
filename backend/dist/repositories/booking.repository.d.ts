import { BaseRepository } from "./base.repository.js";
import { IBookingDocument } from "../models/booking.model.js";
import type { BookingStatus } from "../types/entities.types.js";
declare class BookingRepository extends BaseRepository<IBookingDocument> {
    constructor();
    /** All bookings for a specific customer */
    findByCustomer(customerId: string): Promise<IBookingDocument[]>;
    /** All bookings assigned to a provider */
    findByProvider(providerId: string): Promise<IBookingDocument[]>;
    /** Filter bookings by status */
    findByStatus(userId: string, role: "customer" | "provider", status: BookingStatus): Promise<IBookingDocument[]>;
}
export declare const bookingRepository: BookingRepository;
export {};
//# sourceMappingURL=booking.repository.d.ts.map