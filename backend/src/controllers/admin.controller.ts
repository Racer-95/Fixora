// ─────────────────────────────────────────────
//  FIXORA — Admin Controller
//  Implements all UML Admin methods:
//    manageUsers(), approveProvider(),
//    handleDisputes(), removeUser(userId)
// ─────────────────────────────────────────────
import type { Request, Response } from "express";
import { adminService } from "../services/admin.service.js";

const param = (v: string | string[]): string => (Array.isArray(v) ? v[0]! : v);

/** GET /api/admin/users — Admin.manageUsers() */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** GET /api/admin/providers/pending */
export const getPendingProviders = async (req: Request, res: Response): Promise<void> => {
  try {
    const providers = await adminService.getPendingProviders();
    res.json({ success: true, data: providers });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** PATCH /api/admin/providers/:id/approve — Admin.approveProvider() */
export const approveProvider = async (req: Request, res: Response): Promise<void> => {
  try {
    const provider = await adminService.approveProvider(param(req.params["id"]!));
    res.json({ success: true, data: provider });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** PATCH /api/admin/disputes/:bookingId/resolve — Admin.handleDisputes() */
export const handleDispute = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await adminService.handleDisputes(param(req.params["bookingId"]!));
    res.json({ success: true, data: booking });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** DELETE /api/admin/users/:id — Admin.removeUser(userId) */
export const removeUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await adminService.removeUser(param(req.params["id"]!));
    res.json({ success: true, message: "User removed successfully." });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
