import mongoose, { Document, Types } from "mongoose";
export interface IReviewDocument extends Document {
    bookingId: Types.ObjectId;
    customerId: Types.ObjectId;
    providerId: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Review: mongoose.Model<IReviewDocument, {}, {}, {}, mongoose.Document<unknown, {}, IReviewDocument, {}, mongoose.DefaultSchemaOptions> & IReviewDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IReviewDocument>;
//# sourceMappingURL=review.model.d.ts.map