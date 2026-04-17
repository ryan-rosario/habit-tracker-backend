import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User"


const register = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
        })

        await user.save()

        res.json({ message: "User created successfully ✅" });


    } catch (error) {
        res.status(500).json({ error });
    }

}

const login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" })

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1d" }
        );

        res.json({ message: "Login successful ✅", token })

    } catch (error) {

        res.status(500).json({ error })
    }
}

export { register, login }