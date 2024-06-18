import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const secret = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !user.validPassword(password)) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            secret,
            { expiresIn: "1h" }
        );

        user.token = token;
        await user.save();

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
