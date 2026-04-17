import { Express } from "express";
import authRoutes from "./auth";
import habitRoutes from "./habits";

export const registerRoutes = (app: Express) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/habits", habitRoutes)
}