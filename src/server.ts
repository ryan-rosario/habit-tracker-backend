import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerRoutes } from "./routes";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors());
app.use(express.json());

//ALL ROUTES HANDLED HERE
registerRoutes(app);

mongoose
  .connect(MONGO_URI)
  .then(() => { console.log("MongoDB connected ✅") })
  .catch((err) => { console.log("MongoDB connection error:", err) })

app.get("/", (req, res) => {
  res.send("Habit Tracker Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})