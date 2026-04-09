import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
const app = express();
app.use(cors());
app.use(express.json());
// API routes
app.use("/api", routes);
export default app;
//# sourceMappingURL=app.js.map