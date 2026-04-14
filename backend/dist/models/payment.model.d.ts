import mongoose, { Document, Types } from "mongoose";
import type { PaymentMethod, PaymentStatus } from "../types/entities.types.js";
export interface IPaymentDocument extends Document {
    bookingId: Types.ObjectId;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    createdAt: Date;
}
export declare const Payment: mongoose.Model<IPaymentDocument, {}, {}, {}, mongoose.Document<unknown, {}, IPaymentDocument, {}, mongoose.DefaultSchemaOptions> & IPaymentDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPaymentDocument>;
//# sourceMappingURL=payment.model.d.ts.map