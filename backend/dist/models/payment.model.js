// ─────────────────────────────────────────────
//  FIXORA — Payment Model
//  ER Diagram: Payment(id PK, amount, status, method)
//  Relations: Booking 1..1 → Payment
// ─────────────────────────────────────────────
import mongoose, { Schema } from "mongoose";
const paymentSchema = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        unique: true, // 1:1 with Booking from ER diagram
    },
    amount: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
    },
    method: {
        type: String,
        enum: ["card", "upi", "cash", "wallet"],
        required: true,
    },
}, { timestamps: true });
export const Payment = mongoose.model("Payment", paymentSchema);
//# sourceMappingURL=payment.model.js.map