import { server } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(port, () =>
      console.log(`Server running on ${port} http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
