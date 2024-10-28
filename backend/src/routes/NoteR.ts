import express from "express";
import { createNotes, deleteNote, getAllNotes, getnote, updateNote } from "../controller/getNotes";
const router = express.Router();

router.get('/allnotes', getAllNotes)
router.post('/createnote', createNotes)
router.get('/getnote/:title', getnote)
router.put('/updatenote/:id', updateNote)
router.delete('/deletenote/:id', deleteNote)

export default router