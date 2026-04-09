import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
}, mongoose.Document<unknown, {}, {
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    role: string;
    name?: string | null;
    password?: string | null;
    email?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=user.model.d.ts.map