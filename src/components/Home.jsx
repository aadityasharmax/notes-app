import React, { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";
import Note from "./Note";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    if(notes.length > 0){
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      content: "",
      color: "#fcdc2a",
      createdAt: new Date().toISOString(),
    };

    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const changeColor = (id, color) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, color: color } : note))
    );
  };
  // console.log(notes)
  return (
    <>
      <div className="bg-[#0a0935] min-h-screen">
        <h1 className="text-yellow-400 text-center pt-15 text-4xl">
          Anytime Notes ...
        </h1>

        <div className="flex gap-5 mt-12 p-10 justify-center">
          <LuCirclePlus
            onClick={addNote}
            className="text-yellow-400 text-4xl cursor-pointer"
          />

          <h2 className="text-orange-500 text-2xl">Add Your Notes</h2>
        </div>

        <div>
          {notes
            .filter((note) => note)
            .map((note) => (
              <Note
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                changeColor={changeColor}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
