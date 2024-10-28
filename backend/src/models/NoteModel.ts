import mongoose, { InferSchemaType } from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true }
}, { timestamps: true })

type NoteT = InferSchemaType<typeof noteSchema>

const noteModel = mongoose.model<NoteT>('notes', noteSchema)
export default noteModel