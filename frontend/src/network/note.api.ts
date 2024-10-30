import axios, { AxiosRequestConfig } from "axios";
import { NNoteT, NoteT } from "../types/notes";

export async function fetchData(input: string, init?: AxiosRequestConfig) {
    try {
        const res = await axios.get(input, init);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data
    } catch (err) {
        console.error("ERROR:", err)
        throw err;
    }
}

export const createNote = async (note: NNoteT) => {
    try {
        const res = await axios.post('http://localhost:9099/api/notes/createnote', note)
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data
    } catch (err) {
        console.error("ERROR:", err)
        throw err;
    }
}
export const deleteNote = async (id: string) => {
    try {
        const res = await axios.delete(`http://localhost:9099/api/notes/deletenote/${id}`)
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data
    } catch (err) {
        console.error("ERROR:", err)
        throw err;
    }
}
export const updateNote = async (_id: string, note: NoteT) => {
    try {
        const res = await axios.put(`http://localhost:9099/api/notes/updatenote/${_id}`, note)
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data
    } catch (err) {
        console.error("ERROR:", err)
        throw err;
    }
}
