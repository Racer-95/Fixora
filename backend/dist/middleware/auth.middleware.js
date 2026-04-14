import { authService } from "../services/auth.service.js";
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "No token provided." });
            return;
        }
        const token = authHeader.split(" ")[1];
        // Delegates to AuthService.authenticate() — from UML AuthService
        const payload = await authService.authenticate(token);
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(401).json({ success: false, message: "Unauthorized." });
    }
};
//# sourceMappingURL=auth.middleware.js.map