import { FormEvent, useState } from "react"
import { createNote } from "../network/note.api"

interface PropsT {
    refresh: () => void
}

const CreateNote = (props: PropsT) => {
    const [title, settitle] = useState('')
    const [text, settext] = useState('')

    const handlesubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createNote({ title: title, text: text })
            settext('')
            settitle('')
            alert("note created")
            props.refresh();
        } catch (err) {
            alert('failed to create' + err)
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handlesubmit}>
                    Title:<input type="text" name="title" value={title} onChange={(e) => settitle(e.target.value)} placeholder="title"></input>
                    Text:<input type="text" name="text" value={text} onChange={(e) => settext(e.target.value)} placeholder="text"></input>
                    <button type="submit" className="text-white bg-red-600 px-2 py-1 rounded-full shadow-lg" >submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNote