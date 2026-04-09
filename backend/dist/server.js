import dotenv from "dotenv";
import app from "./app.js";
import { database } from "./common/database/db.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // connect DB
        await database.connect();
        // start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map