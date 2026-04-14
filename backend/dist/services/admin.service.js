// ─────────────────────────────────────────────
//  FIXORA — Admin Service
//
//  PATTERN: Service Layer
//  Implements all Admin UML methods:
//    manageUsers(), approveProvider(),
//    handleDisputes(), removeUser(userId)
// ─────────────────────────────────────────────
import { userRepository } from "../repositories/user.repository.js";
import { bookingRepository } from "../repositories/booking.repository.js";
class AdminService {
    /** Admin.manageUsers() — get all users */
    async getAllUsers() {
        return userRepository.findMany();
    }
    /** Get all pending providers awaiting approval */
    async getPendingProviders() {
        return userRepository.findPendingProviders();
    }
    /** Admin.approveProvider() */
    async approveProvider(providerId) {
        const provider = await userRepository.findById(providerId);
        if (!provider)
            throw new Error("Provider not found.");
        if (provider.role !== "provider")
            throw new Error("User is not a provider.");
        const approved = await userRepository.approveProvider(providerId);
        return approved;
    }
    /**
     * Admin.handleDisputes() — resolve a disputed booking.
     * Marks the booking as cancelled and flags it as resolved.
     */
    async handleDisputes(bookingId) {
        const booking = await bookingRepository.findById(bookingId);
        if (!booking)
            throw new Error("Booking not found.");
        const resolved = await bookingRepository.updateById(bookingId, {
            status: "cancelled", // Admin forcefully cancels disputed bookings
        });
        return resolved;
    }
    /** Admin.removeUser(userId) */
    async removeUser(userId) {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new Error("User not found.");
        await userRepository.deleteById(userId);
    }
}
// Singleton export
export const adminService = new AdminService();
//# sourceMappingURL=admin.service.js.map