// ─────────────────────────────────────────────
//  FIXORA — User Model
//  Uses Mongoose Discriminator pattern to handle
//  Customer / Provider / Admin as sub-documents
//  of a single "users" collection — mirrors ER diagram.
// ─────────────────────────────────────────────
import mongoose, { Schema, Document } from "mongoose";
import type { UserRole } from "../types/entities.types.js";

// ── Mongoose Document type ────────────────────
export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

export interface IProviderDocument extends IUserDocument {
  skills: string[];
  rating: number;
  availability: boolean;
  isApproved: boolean;
}

// ── Base User Schema ─────────────────────────
const userSchema = new Schema<IUserDocument>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type:    String,
      enum:    ["customer", "provider", "admin"],
      default: "customer",
      required: true,
    },
  },
  {
    timestamps: true,
    // Mongoose discriminator key — tells which sub-model to use
    discriminatorKey: "role",
  }
);

export const User = mongoose.model<IUserDocument>("User", userSchema);

// ── Customer Discriminator ────────────────────
// Inherits all User fields; no extra fields needed per UML
export const Customer = User.discriminator<IUserDocument>(
  "customer",
  new Schema({}, { _id: false })
);

// ── Provider Discriminator ────────────────────
// Extra fields: skills, rating, availability (from UML)
export const Provider = User.discriminator<IProviderDocument>(
  "provider",
  new Schema(
    {
      skills:       { type: [String], default: [] },
      rating:       { type: Number, default: 0, min: 0, max: 5 },
      availability: { type: Boolean, default: true },
      isApproved:   { type: Boolean, default: false }, // Admin must approve
    },
    { _id: false }
  )
);

// ── Admin Discriminator ───────────────────────
export const Admin = User.discriminator<IUserDocument>(
  "admin",
  new Schema({}, { _id: false })
);