import type { IBookingDocument } from "../models/booking.model.js";
import type { CreateBookingDTO, UpdateBookingStatusDTO } from "../types/dto.types.js";
interface IBookingService {
    createBooking(customerId: string, data: CreateBookingDTO): Promise<IBookingDocument>;
    getCustomerBookings(customerId: string): Promise<IBookingDocument[]>;
    getProviderBookings(providerId: string): Promise<IBookingDocument[]>;
    acceptBooking(providerId: string, bookingId: string): Promise<IBookingDocument>;
    rejectBooking(providerId: string, bookingId: string): Promise<IBookingDocument>;
    updateStatus(bookingId: string, data: UpdateBookingStatusDTO): Promise<IBookingDocument>;
    cancelBooking(userId: string, bookingId: string): Promise<IBookingDocument>;
}
declare class BookingService implements IBookingService {
    /** Customer.bookService() — creates a pending booking */
    createBooking(customerId: string, data: CreateBookingDTO): Promise<IBookingDocument>;
    /** Customer.viewBookings() */
    getCustomerBookings(customerId: string): Promise<IBookingDocument[]>;
    /** Provider.viewBookings() */
    getProviderBookings(providerId: string): Promise<IBookingDocument[]>;
    /** Provider.acceptBooking() */
    acceptBooking(providerId: string, bookingId: string): Promise<IBookingDocument>;
    /** Provider.rejectBooking() */
    rejectBooking(providerId: string, bookingId: string): Promise<IBookingDocument>;
    /** Provider.updateStatus() — in_progress → completed */
    updateStatus(bookingId: string, data: UpdateBookingStatusDTO): Promise<IBookingDocument>;
    /** Customer.cancelBooking() — only pending/accepted can be cancelled */
    cancelBooking(userId: string, bookingId: string): Promise<IBookingDocument>;
}
export declare const bookingService: BookingService;
export {};
//# sourceMappingURL=booking.service.d.ts.map