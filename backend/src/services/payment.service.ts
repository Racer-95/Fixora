// ─────────────────────────────────────────────
//  FIXORA — Payment Service
//
//  PATTERN: Service Layer + Strategy Pattern delegation
//  Delegates to PaymentContext which selects the
//  correct payment strategy at runtime.
// ─────────────────────────────────────────────
import { PaymentContext } from "../patterns/payment.strategy.js";
import type { IPaymentDocument } from "../models/payment.model.js";
import type { CreatePaymentDTO } from "../types/dto.types.js";

class PaymentService {

  /**
   * Process a payment.
   * Delegates entirely to Strategy Pattern — the service
   * doesn't know which payment method is being used.
   */
  async processPayment(data: CreatePaymentDTO): Promise<IPaymentDocument> {
    return PaymentContext.pay(data.bookingId, data.amount, data.method);
  }
}

// Singleton export
export const paymentService = new PaymentService();
