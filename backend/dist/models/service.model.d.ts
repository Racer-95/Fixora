import mongoose, { Document, Types } from "mongoose";
export interface IServiceDocument extends Document {
    providerId: Types.ObjectId;
    name: string;
    category: string;
    basePrice: number;
    city: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Service: mongoose.Model<IServiceDocument, {}, {}, {}, mongoose.Document<unknown, {}, IServiceDocument, {}, mongoose.DefaultSchemaOptions> & IServiceDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IServiceDocument>;
//# sourceMappingURL=service.model.d.ts.map