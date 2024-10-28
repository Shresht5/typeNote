import { NextFunction, Request, RequestHandler, Response } from "express"
import noteModel from "../models/NoteModel"

interface NoteDataT { title: string, text: string }
interface NoteIdT { id: string }

export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await noteModel.find({})
        res.status(200).json({ success: true, message: "all notes", notes })
    } catch (err) {
        next(err)
    }
}

export const createNotes: RequestHandler<unknown, unknown, NoteDataT, unknown> = async (req, res, next) => {
    try {
        const { title, text } = req.body;
        const newNote = await noteModel.create({ title, text });
        res.status(201).json({ success: true, message: " note create", newNote })

    } catch (err) {
        next(err)
    }
}

export const getnote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const title = req.params.title;
        const note = await noteModel.findOne({ title });
        if (!note) {
            throw Error("note not found")
        }
        res.status(200).json({ success: true, message: " note found", note })

    } catch (err) {
        next(err)
    }
}

export const updateNote: RequestHandler<NoteIdT, unknown, NoteDataT, unknown> = async (req, res, next) => {
    try {
        const id = req.params.id
        const { title, text } = req.body
        const note = await noteModel.findByIdAndUpdate(id, { title, text }, { new: true })
        if (!note) {
            res.status(404).json({ success: false, message: "Note not found" });
            return
        }
        res.status(200).json({ success: true, message: "note updated", note })
    } catch (err) {
        next(err)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const note = await noteModel.findByIdAndDelete(id);
        if (!note) {
            res.status(404).json({ success: false, message: "Note not found" });
            return
        }
        res.status(200).json({ success: true, message: "note deleted", note })

    } catch (err) {
        next(err)
    }
}