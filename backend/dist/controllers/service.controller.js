import { serviceOfferingService } from "../services/service.service.js";
const param = (v) => (Array.isArray(v) ? v[0] : v);
/** GET /api/services?q=plumbing — Customer.searchService(type) */
export const searchServices = async (req, res) => {
    try {
        const query = req.query["q"] ?? "";
        const services = await serviceOfferingService.search(query);
        res.json({ success: true, data: services });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** GET /api/services/mine — Provider's own services */
export const getMyServices = async (req, res) => {
    try {
        const services = await serviceOfferingService.getByProvider(req.user.id);
        res.json({ success: true, data: services });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** POST /api/services — Service.createService() */
export const createService = async (req, res) => {
    try {
        const data = req.body;
        const service = await serviceOfferingService.create(req.user.id, data);
        res.status(201).json({ success: true, data: service });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** PUT /api/services/:id — Service.updateService() */
export const updateService = async (req, res) => {
    try {
        const data = req.body;
        const service = await serviceOfferingService.update(req.user.id, param(req.params["id"]), data);
        res.json({ success: true, data: service });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
/** DELETE /api/services/:id — Service.deleteService() */
export const deleteService = async (req, res) => {
    try {
        await serviceOfferingService.delete(req.user.id, param(req.params["id"]));
        res.json({ success: true, message: "Service deleted successfully." });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
//# sourceMappingURL=service.controller.js.map