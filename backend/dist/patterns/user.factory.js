// ─────────────────────────────────────────────
//  FIXORA — User Factory
//
//  PATTERN: Factory Pattern
//  PURPOSE: Centralises object creation. Instead of
//           instantiating Customer / Provider / Admin
//           directly, callers use UserFactory.create().
//           The factory picks the right Mongoose
//           discriminator model based on the "role" field.
//
//  UML: Customer, Provider, Admin all extend User ──
//       the factory enforces that invariant.
// ─────────────────────────────────────────────
import bcrypt from "bcryptjs";
import { Customer, Provider, Admin } from "../models/user.model.js";
// ── Concrete Creators ─────────────────────────
class CustomerCreator {
    async create(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await Customer.create({
            name: data.name,
            email: data.email.toLowerCase(),
            password: hashed,
            role: "customer",
        });
        return { user, role: "customer" };
    }
}
class ProviderCreator {
    async create(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await Provider.create({
            name: data.name,
            email: data.email.toLowerCase(),
            password: hashed,
            role: "provider",
            skills: data.skills ?? [],
            availability: data.availability ?? true,
            isApproved: false, // must be approved by Admin
        });
        return { user, role: "provider" };
    }
}
class AdminCreator {
    async create(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await Admin.create({
            name: data.name,
            email: data.email.toLowerCase(),
            password: hashed,
            role: "admin",
        });
        return { user, role: "admin" };
    }
}
// ── Factory (Director) ────────────────────────
export class UserFactory {
    static creators = {
        customer: new CustomerCreator(),
        provider: new ProviderCreator(),
        admin: new AdminCreator(),
    };
    /**
     * Factory method — creates the correct user type
     * based on role. Throws if role is unknown.
     */
    static async create(data) {
        const role = data.role ?? "customer";
        const creator = UserFactory.creators[role];
        if (!creator) {
            throw new Error(`Unknown user role: ${role}`);
        }
        return creator.create(data);
    }
}
//# sourceMappingURL=user.factory.js.map