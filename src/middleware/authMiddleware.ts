import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const secret = process.env.JWT_SECRET as string;

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secret) as { id: number };
        const user = await User.findByPk(decoded.id);

        if (!user || user.token !== token) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ message: "Failed to authenticate token" });
    }
};
