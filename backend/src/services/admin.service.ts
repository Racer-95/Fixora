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
import type { IUserDocument } from "../models/user.model.js";
import type { IBookingDocument } from "../models/booking.model.js";

class AdminService {

  /** Admin.manageUsers() — get all users */
  async getAllUsers(): Promise<IUserDocument[]> {
    return userRepository.findMany();
  }

  /** Get all pending providers awaiting approval */
  async getPendingProviders(): Promise<IUserDocument[]> {
    return userRepository.findPendingProviders();
  }

  /** Admin.approveProvider() */
  async approveProvider(providerId: string): Promise<IUserDocument> {
    const provider = await userRepository.findById(providerId);
    if (!provider) throw new Error("Provider not found.");
    if (provider.role !== "provider") throw new Error("User is not a provider.");

    const approved = await userRepository.approveProvider(providerId);
    return approved!;
  }

  /**
   * Admin.handleDisputes() — resolve a disputed booking.
   * Marks the booking as cancelled and flags it as resolved.
   */
  async handleDisputes(bookingId: string): Promise<IBookingDocument> {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) throw new Error("Booking not found.");

    const resolved = await bookingRepository.updateById(bookingId, {
      status: "cancelled", // Admin forcefully cancels disputed bookings
    });
    return resolved!;
  }

  /** Admin.removeUser(userId) */
  async removeUser(userId: string): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("User not found.");
    await userRepository.deleteById(userId);
  }
}

// Singleton export
export const adminService = new AdminService();
