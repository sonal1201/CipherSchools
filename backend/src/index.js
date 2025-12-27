//imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v1Router } from "./routes/v1.route.js";
import { connectDb } from "./config/db.config.js";
// import { pool } from "./config/postgresDb.config.js";

dotenv.config();
const app = express();

// app.get("/health/db", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT 1");
//     res.json({ ok: true });
//   } catch (err) {
//     return res.status(400).json({
//       error: err,
//     });
//   }
// });

const PORT = process.env.PORT;

await connectDb();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING: ${PORT}`);
});
