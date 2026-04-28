// ─────────────────────────────────────────────
//  FIXORA — Express App  (MODIFIED)
//  Wires up: CORS, JSON parsing, all API routes,
//  and a global error handler.
// ─────────────────────────────────────────────
import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// ── Global Middleware ─────────────────────────
app.use(cors({
  origin: "*", // Allows all origins for now. Can be restricted to specific URLs in the future.
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// ── API Routes ────────────────────────────────
app.use("/api", routes);

// ── 404 Handler ───────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global Error Handler ──────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("💥 Unhandled error:", err.message);
  res.status(500).json({ success: false, error: "Internal server error." });
});

export default app;