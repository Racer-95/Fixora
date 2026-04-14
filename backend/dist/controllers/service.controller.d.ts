import type { Request, Response } from "express";
/** GET /api/services?q=plumbing — Customer.searchService(type) */
export declare const searchServices: (req: Request, res: Response) => Promise<void>;
/** GET /api/services/mine — Provider's own services */
export declare const getMyServices: (req: Request, res: Response) => Promise<void>;
/** POST /api/services — Service.createService() */
export declare const createService: (req: Request, res: Response) => Promise<void>;
/** PUT /api/services/:id — Service.updateService() */
export declare const updateService: (req: Request, res: Response) => Promise<void>;
/** DELETE /api/services/:id — Service.deleteService() */
export declare const deleteService: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=service.controller.d.ts.map