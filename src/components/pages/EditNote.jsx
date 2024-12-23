import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { RiDeleteBin6Line} from 'react-icons/ri'
import useCreateDate from '../useCreateDate'

const EditNote = ({notes, setNotes}) => {
    const {id} = useParams();
    const note = notes.find((item)=> item.id == id);
    const [title, setTitle] = useState(note.title);
    const [details, setDetails] = useState(note.details);
    const date = useCreateDate();
    const navigate = useNavigate();

    const handleForm = (e) => {
        e.preventDefault();

        if(title && details) {
            const newNote = {...note, title, details, date};

            const newNotes = notes.map(item => {
                if(item.id == id) {
                    item = newNote;
                }
                return item;
            })
            setNotes(newNotes);
        }
        navigate('/');
    }

    const handledelete = () => {
        const newNote = notes.filter(item=> item.id != id);
        setNotes(newNote);
        navigate('/');
    }

    return (
        <section>
            <header className="create-note__header">
                <Link to='/' className="btn"><IoIosArrowBack /></Link>
                <button className='btn lg primary' onClick={handleForm}>Salvar</button>
                <button className='btn danger' onClick={handledelete}><RiDeleteBin6Line/></button>
            </header>
            <form className="create-note__form" onSubmit={handleForm}>
                <input type="text" placeholder="Título" value={title} onChange={(e)=> setTitle(e.target.value)} autoFocus />
                <textarea rows="28" placeholder="Digite seu texto..." value={details} onChange={(e)=> setDetails(e.target.value)} ></textarea>
            </form>
        </section>
    )
}

export default EditNote