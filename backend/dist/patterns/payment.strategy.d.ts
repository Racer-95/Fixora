import type { IPaymentDocument } from "../models/payment.model.js";
import type { PaymentMethod } from "../types/entities.types.js";
export declare class PaymentContext {
    private static strategies;
    /**
     * Execute payment using the strategy matching `method`.
     * Switches behaviour at runtime based on method parameter.
     */
    static pay(bookingId: string, amount: number, method: PaymentMethod): Promise<IPaymentDocument>;
}
//# sourceMappingURL=payment.strategy.d.ts.map