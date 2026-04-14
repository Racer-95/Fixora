// ─────────────────────────────────────────────
//  FIXORA — User Model
//  Uses Mongoose Discriminator pattern to handle
//  Customer / Provider / Admin as sub-documents
//  of a single "users" collection — mirrors ER diagram.
// ─────────────────────────────────────────────
import mongoose, { Schema } from "mongoose";
// ── Base User Schema ─────────────────────────
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["customer", "provider", "admin"],
        default: "customer",
        required: true,
    },
}, {
    timestamps: true,
    // Mongoose discriminator key — tells which sub-model to use
    discriminatorKey: "role",
});
export const User = mongoose.model("User", userSchema);
// ── Customer Discriminator ────────────────────
// Inherits all User fields; no extra fields needed per UML
export const Customer = User.discriminator("customer", new Schema({}, { _id: false }));
// ── Provider Discriminator ────────────────────
// Extra fields: skills, rating, availability (from UML)
export const Provider = User.discriminator("provider", new Schema({
    skills: { type: [String], default: [] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    availability: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: false }, // Admin must approve
}, { _id: false }));
// ── Admin Discriminator ───────────────────────
export const Admin = User.discriminator("admin", new Schema({}, { _id: false }));
//# sourceMappingURL=user.model.js.map