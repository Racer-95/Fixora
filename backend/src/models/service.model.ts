// ─────────────────────────────────────────────
//  FIXORA — Service Model
//  ER Diagram: Service(id PK, name, category, base_price)
//  Relations: Provider 1..N → Service
// ─────────────────────────────────────────────
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IServiceDocument extends Document {
  providerId: Types.ObjectId;
  name:       string;
  category:   string;
  basePrice:  number;
  city:       string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IServiceDocument>(
  {
    providerId: {
      type:     Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    name:     { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    basePrice:{ type: Number, required: true, min: 0 },
    city:     { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// ── Index for search by category ──────────────
serviceSchema.index({ category: 1 });
serviceSchema.index({ providerId: 1 });

export const Service = mongoose.model<IServiceDocument>("Service", serviceSchema);
