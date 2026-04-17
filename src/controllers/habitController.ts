import { Response } from "express";
import Habit from "../models/Habit";


const createHabit = async (req: any, res: Response) => {
    const habit = new Habit({
        userId: req.user.userId,
        title: req.body.title
    })
    try {
        await habit.save();
        res.json(habit)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllHabits = async (req: any, res: Response) => {
    try {
        const habits = await Habit.find({ userId: req.user.userId });
        res.json(habits);
    } catch (error) {
        res.status(500).json(error)
    }
}

const toggleCompleteHabit = async (req: any, res: Response) => {
    try {
        const habit = await Habit.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!habit) return res.status(404).json({ message: "Not found" });

        habit.completed = !habit.completed;
        await habit.save()

        res.json(habit);

    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteHabit = async (req: any, res: Response) => {
    try {
        await Habit.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });
        res.json({ message: "Deleted" })
    } catch (error) {
        res.status(500).json(error)
    }
}


export { createHabit, getAllHabits, toggleCompleteHabit, deleteHabit }
