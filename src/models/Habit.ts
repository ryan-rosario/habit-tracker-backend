import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
    userId: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

const HabitSchema: Schema = new Schema<IHabit>({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IHabit>("Habit", HabitSchema);