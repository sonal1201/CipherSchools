//imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { v1Router } from "./routes/v1.route.js";
import { connectDb } from "./config/db.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

await connectDb();

//middleware
app.use(express.json());
app.use(cors())

//routes
app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING: ${PORT}`);
});
