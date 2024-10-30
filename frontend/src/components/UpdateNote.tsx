import { FormEvent, useState } from "react"
import { NoteT } from "../types/notes"
import { updateNote } from "../network/note.api"

interface PropsT {
    note: NoteT
    close: () => void
}
const UpdateNote = (props: PropsT) => {
    const [title, setTitle] = useState(props.note.title)
    const [text, setText] = useState(props.note.text);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const Upnote = { ...props.note, title, text }
            await updateNote(props.note._id, Upnote)
            alert('note updated');
            window.location.reload();
        } catch (err) {
            alert("update failed")
        }
    }

    return (
        <div className='fixed top-[-8px] left-0 flex justify-center pt-10 bg-slate-700 bg-opacity-60 h-full w-full'>
            <div className="bg-white max-w-xl p-4 w-full space-y-3">
                <div className="flex justify-end">
                    <button onClick={props.close} className="border-gray-700 border-[1px] px-2">X</button>
                </div>
                <h4 className="text-3xl"> Update Notes</h4>
                <div className="w-full bg-gray-600 mt-2 h-[1px]"></div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <h5 className="text-xl">Title:</h5>
                    <input name="title" value={title} onChange={(e) => { setTitle(e.target.value) }} className="border-[1px] border-gray-700 rounded-lg px-2"></input>
                    <h5 className="text-xl">Text:</h5>

                    <input name="text" value={text} onChange={(e) => { setText(e.target.value) }} className="border-[1px] border-gray-700 rounded-lg px-2"></input>
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateNote