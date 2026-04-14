// ─────────────────────────────────────────────
//  FIXORA — Auth Service  (MODIFIED)
//
//  PATTERN: Service Layer + Singleton
//  Now uses UserFactory (Factory Pattern) for registration
//  and userRepository (Repository Pattern) for login.
//  Implements IAuthService interface contract.
// ─────────────────────────────────────────────
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { UserFactory } from "../patterns/user.factory.js";
// ── Service Implementation ────────────────────
class AuthService {
    /**
     * Register — delegates creation to UserFactory.
     * Factory picks Customer / Provider / Admin discriminator.
     */
    async register(data) {
        const exists = await userRepository.exists({ email: data.email.toLowerCase() });
        if (exists)
            throw new Error("An account with this email already exists.");
        // Factory Pattern — correct user sub-type created here
        const { user, role } = await UserFactory.create(data);
        const token = this.generateToken(user._id.toString(), role);
        return {
            success: true,
            token,
            user: { id: user._id.toString(), name: user.name, email: user.email, role },
        };
    }
    /**
     * Login — uses Repository to find user, bcrypt to verify.
     */
    async login(data) {
        const user = await userRepository.findByEmail(data.email);
        if (!user)
            throw new Error("Invalid email or password.");
        const match = await bcrypt.compare(data.password, user.password);
        if (!match)
            throw new Error("Invalid email or password.");
        const token = this.generateToken(user._id.toString(), user.role);
        return {
            success: true,
            token,
            user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
        };
    }
    /**
     * AuthService.authenticate() — verifies JWT and returns payload.
     * Used by AuthMiddleware and other services.
     * Implements the "authenticate()" method from UML AuthService.
     */
    async authenticate(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload;
        }
        catch {
            throw new Error("Token is invalid or expired.");
        }
    }
    /** Private — generates signed JWT with id + role in payload */
    generateToken(userId, role) {
        return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    }
}
// Singleton export — shared across app (one instance)
export const authService = new AuthService();
//# sourceMappingURL=auth.service.js.map