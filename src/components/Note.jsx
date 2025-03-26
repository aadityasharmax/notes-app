    import React, { useState } from 'react'
    import { MdDelete } from "react-icons/md";
    import { HiColorSwatch } from "react-icons/hi";
    import { SketchPicker } from 'react-color';

    const Note = ({ deleteNote , changeColor , note}) => {
        const [showColorPicker , setShowColorPicker] = useState(false)
        const[showDeleteButton , setShowDeleteButton] = useState(true)

        const getFormattedDate = () => {
            const options = { year : 'numeric' , month : 'short' , day : 'numeric' , hour : '2-digit' , minute : '2-digit'}
            return new Date(note.createdAt).toLocaleDateString('en-US',options)
        }

        const handleColorChange = () => {
            setShowColorPicker(true)
            setShowDeleteButton(false)
        }

        const handleChangeComplete = (color) => {
            changeColor(note.id , color.hex);
            setShowColorPicker(false)
            setShowDeleteButton(true)
        }


    return (
        <>
        <div className='h-[250px] w-[200px] m-8 rounded-3xl inline-block '    style={{ backgroundColor: note.color }}    >

        <div className='text-black text-lg p-1 bg-white rounded-t-3xl  '>{getFormattedDate()}</div>

        <div className='h-[70%] w-[calc(100%-20px)] text-ellipsis overflow-hidden pl-3 py-2 outline-0'  
        suppressContentEditableWarning={true}
        contentEditable>{note.content || "New Note"}</div>

        <div className='flex gap-3 justify-end my-2 mx-4'>
            
            {showDeleteButton && <MdDelete className='text-xl cursor-pointer  rounded-xl ' onClick={() => deleteNote(note.id)}/> }
            <HiColorSwatch className='text-xl cursor-pointer  rounded-xl '  onClick={handleColorChange}></HiColorSwatch>

            {showColorPicker && <SketchPicker color={note.color}  onChangeComplete={handleChangeComplete}
            onClick={handleColorChange}
            />}
            
        </div>

            
            
        </div>
        </>
    )
    }

    export default Note