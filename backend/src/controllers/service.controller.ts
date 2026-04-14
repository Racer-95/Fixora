// ─────────────────────────────────────────────
//  FIXORA — Service (Offering) Controller
//  Thin HTTP layer — all logic in ServiceOfferingService.
// ─────────────────────────────────────────────
import type { Request, Response } from "express";
import { serviceOfferingService } from "../services/service.service.js";
import type { CreateServiceDTO, UpdateServiceDTO } from "../types/dto.types.js";

const param = (v: string | string[]): string => (Array.isArray(v) ? v[0]! : v);

/** GET /api/services?q=plumbing — Customer.searchService(type) */
export const searchServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = (req.query["q"] as string) ?? "";
    const services = await serviceOfferingService.search(query);
    res.json({ success: true, data: services });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** GET /api/services/mine — Provider's own services */
export const getMyServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await serviceOfferingService.getByProvider(req.user!.id);
    res.json({ success: true, data: services });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** POST /api/services — Service.createService() */
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CreateServiceDTO = req.body;
    const service = await serviceOfferingService.create(req.user!.id, data);
    res.status(201).json({ success: true, data: service });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** PUT /api/services/:id — Service.updateService() */
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: UpdateServiceDTO = req.body;
    const service = await serviceOfferingService.update(req.user!.id, param(req.params["id"]!), data);
    res.json({ success: true, data: service });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** DELETE /api/services/:id — Service.deleteService() */
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    await serviceOfferingService.delete(req.user!.id, param(req.params["id"]!));
    res.json({ success: true, message: "Service deleted successfully." });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
