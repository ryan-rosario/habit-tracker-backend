import express from "express";
import { authMiddleware } from "../middleware/auth";

import {
    createHabit,
    getAllHabits,
    toggleCompleteHabit,
    deleteHabit
} from "../controllers/habitController";



const router = express.Router();

//CREATE HABIT
router.post("/", authMiddleware, createHabit);
//GET ALL HABITS
router.get("/", authMiddleware, getAllHabits);
//TOGGLE COMPLETE
router.put("/:id", authMiddleware, toggleCompleteHabit)
//DELETE HABIT
router.delete("/:id", authMiddleware, deleteHabit)


export default router