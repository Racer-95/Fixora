import type { IUserDocument } from "../models/user.model.js";
import type { RegisterDTO } from "../types/dto.types.js";
import type { UserRole } from "../types/entities.types.js";
interface UserCreationResult {
    user: IUserDocument;
    role: UserRole;
}
export declare class UserFactory {
    private static creators;
    /**
     * Factory method — creates the correct user type
     * based on role. Throws if role is unknown.
     */
    static create(data: RegisterDTO): Promise<UserCreationResult>;
}
export {};
//# sourceMappingURL=user.factory.d.ts.map