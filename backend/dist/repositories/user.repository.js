// ─────────────────────────────────────────────
//  FIXORA — User Repository
//  Extends BaseRepository with user-specific queries
// ─────────────────────────────────────────────
import { BaseRepository } from "./base.repository.js";
import { User } from "../models/user.model.js";
class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }
    /** Find user by email (used in auth) */
    async findByEmail(email) {
        return this.model.findOne({ email: email.toLowerCase() }).exec();
    }
    /** Get all users of a specific role */
    async findByRole(role) {
        return this.model.find({ role }).exec();
    }
    /** Get all providers pending approval */
    async findPendingProviders() {
        return this.model
            .find({ role: "provider", isApproved: false })
            .exec();
    }
    /** Approve a provider (Admin action) */
    async approveProvider(providerId) {
        return this.updateById(providerId, { isApproved: true });
    }
}
// Singleton export — one instance shared across app
export const userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map