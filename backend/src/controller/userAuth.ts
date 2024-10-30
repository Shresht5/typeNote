import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import UserModel from "../models/UserModel";

interface UserDataT {
    _id: string
    Uname: string;
    Uemail: string;
    Upass: string;
    notes?: string[];
}
interface LoginT {
    Uemail: string;
    Upass: string;
}

declare module 'express-session' {
    interface SessionData {
        UserId: string; // Add UserId to session
    }
}

export const signUp: RequestHandler<unknown, unknown, UserDataT, unknown> = async (req, res, next) => {
    const { Uname, Uemail, Upass } = req.body;
    try {
        if (!Uname || !Uemail || !Upass) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }
        const exist = await UserModel.findOne({ Uemail });
        if (exist) {
            res.status(409).json({ success: false, message: "User already exists" });
            return
        }
        const hashPass = await bcrypt.hash(Upass, 10)
        const newUser = await UserModel.create({ Uname, Uemail, Upass: hashPass })
        res.status(201).json({ success: true, message: "user created", newUser })
    } catch (err) {
        next(err);
    }
}

export const login: RequestHandler<unknown, unknown, LoginT, unknown> = async (req, res, next) => {
    const { Uemail, Upass } = req.body;
    try {
        if (!Uemail || !Upass) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }

        const user = await UserModel.findOne({ Uemail });
        if (!user) {
            res.status(409).json({ success: false, message: "User doesn't exist" });
            return;
        }

        if (user.Upass) {
            const passMatch = await bcrypt.compare(Upass, user.Upass);
            if (!passMatch) {
                res.status(409).json({ success: false, message: "Password is wrong" });
                return;
            }
        } else {
            res.status(409).json({ success: false, message: "Password not found" });
            return;
        }

        req.session.UserId = user._id.toString();
        res.status(200).json({ success: true, message: "User logged in" });
    } catch (err) {
        next(err);
    }
}

export const isAuthUser: RequestHandler = async (req, res, next) => {
    const authUserId = req.session.UserId;
    try {
        if (!authUserId) {
            res.status(400).json({ success: false, message: "user is not authinticated" })
        }
        const user = await UserModel.findById(authUserId);
        if (!user) {
            res.status(400).json({ success: false, message: "user is not authinticate" })
        }
        res.status(200).json({ success: true, message: "user is authorized" })

    } catch (err) {
        next(err);
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({ success: true })
        }
    })
}