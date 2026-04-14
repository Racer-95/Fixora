// ─────────────────────────────────────────────
//  FIXORA — Booking Model
//  ER Diagram: Booking(id PK, status, scheduledTime)
//  Relations: Customer 1..M → Booking, Provider 1..M → Booking
// ─────────────────────────────────────────────
import mongoose, { Schema, Document, Types } from "mongoose";
import type { BookingStatus } from "../types/entities.types.js";

export interface IBookingDocument extends Document {
  customerId:    Types.ObjectId;
  providerId:    Types.ObjectId;
  serviceId:     Types.ObjectId;
  status:        BookingStatus;
  scheduledTime: Date;
  createdAt:     Date;
  updatedAt:     Date;
}

const bookingSchema = new Schema<IBookingDocument>(
  {
    customerId: {
      type:     Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    providerId: {
      type:     Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    serviceId: {
      type:     Schema.Types.ObjectId,
      ref:      "Service",
      required: true,
    },
    status: {
      type:    String,
      enum:    ["pending", "accepted", "rejected", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    scheduledTime: {
      type:     Date,
      required: true,
    },
  },
  { timestamps: true }
);

// ── Index for fast queries ────────────────────
bookingSchema.index({ customerId: 1, status: 1 });
bookingSchema.index({ providerId: 1, status: 1 });

export const Booking = mongoose.model<IBookingDocument>("Booking", bookingSchema);
