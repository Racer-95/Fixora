import mongoose, { Document, Types } from "mongoose";
import type { BookingStatus } from "../types/entities.types.js";
export interface IBookingDocument extends Document {
    customerId: Types.ObjectId;
    providerId: Types.ObjectId;
    serviceId: Types.ObjectId;
    status: BookingStatus;
    scheduledTime: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Booking: mongoose.Model<IBookingDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBookingDocument, {}, mongoose.DefaultSchemaOptions> & IBookingDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBookingDocument>;
//# sourceMappingURL=booking.model.d.ts.map