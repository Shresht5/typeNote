import { useState } from "react";
import { deleteNote } from "../network/note.api";
import { NoteT } from "../types/notes";
import { formatDate } from "../utils/FormatDate";
import UpdateNote from "./UpdateNote";

interface NotePropsT {
    note: NoteT
    refresh: () => void
}

const Note = (props: NotePropsT) => {
    const [updateBut, setUpdateBut] = useState<boolean>(false)
    const note = props.note;
    let date: string;
    if (new Date(note.updatedAt) > new Date(note.createdAt)) {
        date = formatDate(new Date(note.updatedAt));
    } else {
        date = formatDate(new Date(note.createdAt));
    }

    const deletefun = async () => {
        try {
            await deleteNote(note._id)
            alert("note deleted")
            props.refresh();
        } catch (err) {
            alert("delete failed" + err)
        }
    }
    const updatefun = () => {
        setUpdateBut(!updateBut)
    }

    return (
        <div className="p-3  bg-yellow-50 max-w-96 mt-2 mr-2 space-y-2 hover:bg-yellow-100">
            <h3 className="font-bold text-xl inline-block">{note.title}</h3>
            <button onClick={updatefun} className="border-2 border-gray-400 px-2 text-gray-600">Upd</button>
            <button onClick={deletefun} className="border-2 border-red-400 px-2 text-red-600">Del</button>
            <div className="h-[2px] bg-yellow-500"></div>
            <pre>{note.text}</pre>
            <p className="bg-[rgba(218,209,137,0.67)]">date: {date}</p>
            {updateBut && <UpdateNote note={note} close={updatefun} />}
        </div>
    )
}
export default Note