import { BaseRepository } from "./base.repository.js";
import { IUserDocument } from "../models/user.model.js";
import type { UserRole } from "../types/entities.types.js";
declare class UserRepository extends BaseRepository<IUserDocument> {
    constructor();
    /** Find user by email (used in auth) */
    findByEmail(email: string): Promise<IUserDocument | null>;
    /** Get all users of a specific role */
    findByRole(role: UserRole): Promise<IUserDocument[]>;
    /** Get all providers pending approval */
    findPendingProviders(): Promise<IUserDocument[]>;
    /** Approve a provider (Admin action) */
    approveProvider(providerId: string): Promise<IUserDocument | null>;
}
export declare const userRepository: UserRepository;
export {};
//# sourceMappingURL=user.repository.d.ts.map