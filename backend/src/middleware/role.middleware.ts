// ─────────────────────────────────────────────
//  FIXORA — Role Guard Middleware
//
//  PATTERN: Middleware Chain
//  PURPOSE: Implements AuthService.authorize() from UML.
//           Works after authMiddleware — uses req.user.role
//           to enforce role-based access control (RBAC).
//
//  Usage:
//    router.delete("/user/:id", authMiddleware, roleGuard("admin"), deleteUser)
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../types/entities.types.js";

/**
 * roleGuard(...roles) — higher-order function that returns
 * an Express middleware enforcing that req.user.role is
 * one of the allowed roles.
 *
 * Implements: AuthService.authorize() from UML diagram.
 */
export const roleGuard = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: [${allowedRoles.join(", ")}]`,
      });
      return;
    }

    next();
  };
};
