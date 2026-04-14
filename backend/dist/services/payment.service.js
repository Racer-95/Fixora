// ─────────────────────────────────────────────
//  FIXORA — Payment Service
//
//  PATTERN: Service Layer + Strategy Pattern delegation
//  Delegates to PaymentContext which selects the
//  correct payment strategy at runtime.
// ─────────────────────────────────────────────
import { PaymentContext } from "../patterns/payment.strategy.js";
class PaymentService {
    /**
     * Process a payment.
     * Delegates entirely to Strategy Pattern — the service
     * doesn't know which payment method is being used.
     */
    async processPayment(data) {
        return PaymentContext.pay(data.bookingId, data.amount, data.method);
    }
}
// Singleton export
export const paymentService = new PaymentService();
//# sourceMappingURL=payment.service.js.map