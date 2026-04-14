import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../types/entities.types.js";
/**
 * roleGuard(...roles) — higher-order function that returns
 * an Express middleware enforcing that req.user.role is
 * one of the allowed roles.
 *
 * Implements: AuthService.authorize() from UML diagram.
 */
export declare const roleGuard: (...allowedRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map