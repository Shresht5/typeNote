import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    Uname: { type: String, require: true },
    Uemail: { type: String, require: true, unique: true },
    Upass: { type: String, require: true },
    notes: { type: Array }
}, { timestamps: true })

type UserT = InferSchemaType<typeof userSchema>

export default mongoose.model<UserT>('users', userSchema)