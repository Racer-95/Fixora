import type { Request, Response } from "express";
/** GET /api/admin/users — Admin.manageUsers() */
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
/** GET /api/admin/providers/pending */
export declare const getPendingProviders: (req: Request, res: Response) => Promise<void>;
/** PATCH /api/admin/providers/:id/approve — Admin.approveProvider() */
export declare const approveProvider: (req: Request, res: Response) => Promise<void>;
/** PATCH /api/admin/disputes/:bookingId/resolve — Admin.handleDisputes() */
export declare const handleDispute: (req: Request, res: Response) => Promise<void>;
/** DELETE /api/admin/users/:id — Admin.removeUser(userId) */
export declare const removeUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map