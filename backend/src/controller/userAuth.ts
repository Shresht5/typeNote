import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import UserModel from "../models/UserModel";

interface UserDataT {
    _id?: string
    Uname: string;
    Uemail: string;
    Upass: string;
    notes?: string[];
}

export const signUp: RequestHandler<unknown, unknown, UserDataT, unknown> = async (req, res, next) => {
    const { Uname, Uemail, Upass } = req.body;
    try {
        if (!Uname || !Uemail || !Upass) {
            throw Error("empty credentials")
        }
        const exist = await UserModel.findOne({ Uemail });
        if (exist) {
            throw Error("user already exist")
        }
        const hashPass = await bcrypt.hash(Upass, 10)
        await UserModel.create({ Uname, Uemail })
    } catch (err) {
        next(err);
    }
}