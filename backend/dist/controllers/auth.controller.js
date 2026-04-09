import { authService } from "../services/auth.service.js";
export const register = async (req, res) => {
    try {
        const token = await authService.register(req.body.name, req.body.email, req.body.password);
        res.json({ success: true, token });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const login = async (req, res) => {
    try {
        const token = await authService.login(req.body.email, req.body.password);
        res.json({ success: true, token });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//# sourceMappingURL=auth.controller.js.map