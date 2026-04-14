// ─────────────────────────────────────────────
//  FIXORA — Auth Middleware  (MODIFIED)
//  Now attaches typed { id, role } to request.
//  Uses authService.authenticate() — AuthService from UML.
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import type { UserRole } from "../types/entities.types.js";

// Extend Express Request with typed user
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: UserRole };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "No token provided." });
      return;
    }

    const token = authHeader.split(" ")[1];
    // Delegates to AuthService.authenticate() — from UML AuthService
    const payload = await authService.authenticate(token);

    req.user = payload as { id: string; role: UserRole };
    next();
  } catch (err: any) {
    res.status(401).json({ success: false, message: "Unauthorized." });
  }
};