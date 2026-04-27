// ─────────────────────────────────────────────
//  FIXORA — Service (Offering) Routes
//  GET /search is public. All mutations are provider-only.
// ─────────────────────────────────────────────
import { Router } from "express";
import {
  searchServices,
  getMyServices,
  createService,
  updateService,
  deleteService,
  getServiceById,
} from "../controllers/service.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleGuard } from "../middleware/role.middleware.js";

const router = Router();

// Public: Customer.searchService(type)
router.get("/", searchServices);
router.get("/:id", getServiceById);

// Protected provider routes
router.get( "/mine",  authMiddleware, roleGuard("provider"), getMyServices);
router.post("/",      authMiddleware, roleGuard("provider"), createService);   // Service.createService()
router.put( "/:id",   authMiddleware, roleGuard("provider"), updateService);   // Service.updateService()
router.delete("/:id", authMiddleware, roleGuard("provider"), deleteService);   // Service.deleteService()

export default router;
