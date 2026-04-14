// ─────────────────────────────────────────────
//  FIXORA — User Repository
//  Extends BaseRepository with user-specific queries
// ─────────────────────────────────────────────
import { BaseRepository } from "./base.repository.js";
import { User, IUserDocument } from "../models/user.model.js";
import type { UserRole } from "../types/entities.types.js";

class UserRepository extends BaseRepository<IUserDocument> {
  constructor() {
    super(User);
  }

  /** Find user by email (used in auth) */
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({ email: email.toLowerCase() }).exec();
  }

  /** Get all users of a specific role */
  async findByRole(role: UserRole): Promise<IUserDocument[]> {
    return this.model.find({ role }).exec();
  }

  /** Get all providers pending approval */
  async findPendingProviders(): Promise<IUserDocument[]> {
    return this.model
      .find({ role: "provider", isApproved: false })
      .exec();
  }

  /** Approve a provider (Admin action) */
  async approveProvider(providerId: string): Promise<IUserDocument | null> {
    return this.updateById(providerId, { isApproved: true });
  }
}

// Singleton export — one instance shared across app
export const userRepository = new UserRepository();
