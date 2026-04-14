// ─────────────────────────────────────────────
//  FIXORA — Payment Strategy
//
//  PATTERN: Strategy Pattern
//  PURPOSE: Different payment methods (card, upi,
//           cash, wallet) share a common interface
//           but have different processing logic.
//           PaymentContext switches strategy at runtime.
//
//  UML/ER: Payment entity with method field ──
//          each method is a concrete strategy.
// ─────────────────────────────────────────────
import { Payment } from "../models/payment.model.js";
// ── 2. Concrete Strategies ────────────────────
class CardPaymentStrategy {
    method = "card";
    async process(bookingId, amount) {
        // In production: call Stripe / Razorpay SDK here
        console.log(`💳 Processing card payment of ₹${amount} for booking ${bookingId}`);
        return Payment.create({ bookingId, amount, method: "card", status: "completed" });
    }
}
class UpiPaymentStrategy {
    method = "upi";
    async process(bookingId, amount) {
        // In production: call UPI payment gateway here
        console.log(`📱 Processing UPI payment of ₹${amount} for booking ${bookingId}`);
        return Payment.create({ bookingId, amount, method: "upi", status: "completed" });
    }
}
class CashPaymentStrategy {
    method = "cash";
    async process(bookingId, amount) {
        // Cash is collected offline — mark as pending until confirmed
        console.log(`💵 Registering cash payment of ₹${amount} for booking ${bookingId}`);
        return Payment.create({ bookingId, amount, method: "cash", status: "pending" });
    }
}
class WalletPaymentStrategy {
    method = "wallet";
    async process(bookingId, amount) {
        // In production: deduct from user wallet balance
        console.log(`👛 Processing wallet payment of ₹${amount} for booking ${bookingId}`);
        return Payment.create({ bookingId, amount, method: "wallet", status: "completed" });
    }
}
// ── 3. Context — selects and runs the strategy ─
export class PaymentContext {
    static strategies = {
        card: new CardPaymentStrategy(),
        upi: new UpiPaymentStrategy(),
        cash: new CashPaymentStrategy(),
        wallet: new WalletPaymentStrategy(),
    };
    /**
     * Execute payment using the strategy matching `method`.
     * Switches behaviour at runtime based on method parameter.
     */
    static async pay(bookingId, amount, method) {
        const strategy = PaymentContext.strategies[method];
        if (!strategy) {
            throw new Error(`Unsupported payment method: ${method}`);
        }
        return strategy.process(bookingId, amount);
    }
}
//# sourceMappingURL=payment.strategy.js.map