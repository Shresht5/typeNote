import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { NoteT } from "../types/notes";
import Note from "../components/Note";
import { fetchData } from "../network/note.api";
import CreateNote from "../components/CreateNote";


const Home = () => {
    const [showAddNote, setShowAddNote] = useState<boolean>(false);
    const [notes, setNotes] = useState<NoteT[]>([]);

    const getAllNotes = async () => {
        try {
            const res = await fetchData('http://localhost:9099/api/notes/allnotes')
            setNotes(res.notes);
        } catch (err) {
            console.error("Error fetching notes:", err);
            alert(err)
        }
    }
    useEffect(() => {
        getAllNotes()
    }, [])

    return (
        <div>
            <Navbar /><button onClick={() => { setShowAddNote(!showAddNote) }} className="border-blue-500 text-blue-500 border-2 p-2 rounded-full">Create Note</button>
            <div className="flex flex-wrap justify-evenly">
                {notes.map(data => (
                    <Note note={data} key={data._id} refresh={getAllNotes} />
                ))}
            </div>
            {showAddNote && <CreateNote refresh={getAllNotes} />}
        </div>
    )
}

export default Home;