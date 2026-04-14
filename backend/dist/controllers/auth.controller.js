import { authService } from "../services/auth.service.js";
export const register = async (req, res) => {
    try {
        const data = req.body;
        const result = await authService.register(data);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
export const login = async (req, res) => {
    try {
        const data = req.body;
        const result = await authService.login(data);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
export const getProfile = async (req, res) => {
    res.json({ success: true, data: req.user });
};
//# sourceMappingURL=auth.controller.js.map