// ─────────────────────────────────────────────
//  FIXORA — Express App  (MODIFIED)
//  Wires up: CORS, JSON parsing, all API routes,
//  and a global error handler.
// ─────────────────────────────────────────────
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
const app = express();
// ── Global Middleware ─────────────────────────
app.use(cors());
app.use(express.json());
// ── API Routes ────────────────────────────────
app.use("/api", routes);
// ── 404 Handler ───────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
});
// ── Global Error Handler ──────────────────────
app.use((err, _req, res, _next) => {
    console.error("💥 Unhandled error:", err.message);
    res.status(500).json({ success: false, error: "Internal server error." });
});
export default app;
//# sourceMappingURL=app.js.map