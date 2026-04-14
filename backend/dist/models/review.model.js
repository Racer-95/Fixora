// ─────────────────────────────────────────────
//  FIXORA — Review Model
//  ER Diagram: Review(id, rating, comment)
//  Relations: Booking 1..0-1 → Review
// ─────────────────────────────────────────────
import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        unique: true, // one review per booking (1..0-1 from ER diagram)
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    providerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
}, { timestamps: true });
// ── Index for provider rating aggregation ─────
reviewSchema.index({ providerId: 1 });
export const Review = mongoose.model("Review", reviewSchema);
//# sourceMappingURL=review.model.js.map