
import express from "express";
import noteModel from "../models/NoteModel";
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const notes = await noteModel.find({})
        res.status(200).json({ success: true, message: "all notes", notes })

    } catch (err) {
        next(err)
    }
})

export default router