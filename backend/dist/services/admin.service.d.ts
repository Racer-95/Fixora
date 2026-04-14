import type { IUserDocument } from "../models/user.model.js";
import type { IBookingDocument } from "../models/booking.model.js";
declare class AdminService {
    /** Admin.manageUsers() — get all users */
    getAllUsers(): Promise<IUserDocument[]>;
    /** Get all pending providers awaiting approval */
    getPendingProviders(): Promise<IUserDocument[]>;
    /** Admin.approveProvider() */
    approveProvider(providerId: string): Promise<IUserDocument>;
    /**
     * Admin.handleDisputes() — resolve a disputed booking.
     * Marks the booking as cancelled and flags it as resolved.
     */
    handleDisputes(bookingId: string): Promise<IBookingDocument>;
    /** Admin.removeUser(userId) */
    removeUser(userId: string): Promise<void>;
}
export declare const adminService: AdminService;
export {};
//# sourceMappingURL=admin.service.d.ts.map