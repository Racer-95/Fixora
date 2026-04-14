import EventEmitter from "events";
import type { IBookingDocument } from "../models/booking.model.js";
interface BookingEventMap {
    "booking:created": [booking: IBookingDocument];
    "booking:accepted": [booking: IBookingDocument];
    "booking:rejected": [booking: IBookingDocument];
    "booking:cancelled": [booking: IBookingDocument];
    "booking:completed": [booking: IBookingDocument];
}
declare class BookingEventEmitter extends EventEmitter {
    /** Emit with full TypeScript type safety */
    emitEvent<K extends keyof BookingEventMap>(event: K, ...args: BookingEventMap[K]): boolean;
    /** Subscribe with full TypeScript type safety */
    onEvent<K extends keyof BookingEventMap>(event: K, listener: (...args: BookingEventMap[K]) => void): this;
}
export declare const bookingEvents: BookingEventEmitter;
export {};
//# sourceMappingURL=booking.events.d.ts.map