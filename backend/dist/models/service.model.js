// ─────────────────────────────────────────────
//  FIXORA — Service Model
//  ER Diagram: Service(id PK, name, category, base_price)
//  Relations: Provider 1..N → Service
// ─────────────────────────────────────────────
import mongoose, { Schema } from "mongoose";
const serviceSchema = new Schema({
    providerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    basePrice: { type: Number, required: true, min: 0 },
    city: { type: String, required: true, trim: true },
}, { timestamps: true });
// ── Index for search by category ──────────────
serviceSchema.index({ category: 1 });
serviceSchema.index({ providerId: 1 });
export const Service = mongoose.model("Service", serviceSchema);
//# sourceMappingURL=service.model.js.map