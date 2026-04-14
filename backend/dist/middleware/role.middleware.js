/**
 * roleGuard(...roles) — higher-order function that returns
 * an Express middleware enforcing that req.user.role is
 * one of the allowed roles.
 *
 * Implements: AuthService.authorize() from UML diagram.
 */
export const roleGuard = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized." });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: `Access denied. Requires one of: [${allowedRoles.join(", ")}]`,
            });
            return;
        }
        next();
    };
};
//# sourceMappingURL=role.middleware.js.map