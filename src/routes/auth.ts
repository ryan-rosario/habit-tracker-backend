import express from "express";
import { register, login } from "../controllers/authController"


const router = express.Router();

// SIGNUP
router.post("/signup", register);

// LOGIN
router.post("/login", login);


export default router;