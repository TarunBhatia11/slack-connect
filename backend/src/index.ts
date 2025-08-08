import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDB } from "./db";
import authRouter from "./auth";
import messageRouter from "./messages";
import { startScheduler } from "./scheduler"; // ✅ IMPORT THIS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/auth", authRouter);
app.use("/message", messageRouter);


// ✅ Root test route
app.get("/", (_, res) => {
  res.send("Slack OAuth & Messaging Service Running!");
});

initDB().then(() => {
  console.log("✅ Database initialized");

  // ✅ Start the scheduler only after DB is ready
  startScheduler();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
