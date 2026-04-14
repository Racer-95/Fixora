import type { IPaymentDocument } from "../models/payment.model.js";
import type { CreatePaymentDTO } from "../types/dto.types.js";
declare class PaymentService {
    /**
     * Process a payment.
     * Delegates entirely to Strategy Pattern — the service
     * doesn't know which payment method is being used.
     */
    processPayment(data: CreatePaymentDTO): Promise<IPaymentDocument>;
}
export declare const paymentService: PaymentService;
export {};
//# sourceMappingURL=payment.service.d.ts.map