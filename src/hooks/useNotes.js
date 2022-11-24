import { useEffect, useState } from "react";
import { noteStoreKey } from "../utils/constants";

export default function useNotes() {
  const [notes, setNotes] = useState(loadNotes());

  useEffect(() => {
    localStorage.setItem(noteStoreKey, JSON.stringify(notes));
  }, [notes]);

  const addNote = ({ text, ...args }) => {
    const recentNote = notes[notes.length - 1];

    setNotes((n) => {
      return [
        ...n,
        {
          id:  Date.now(),//n.length === 0 ? 1 : n[n.length - 1].id + 1,
          text,
          x: recentNote?recentNote.x+50:0,
          y:recentNote? recentNote.y+50:0,
          width: 180,
          height: 180,
          bgColor: "#add8e6",
          createdAt: new Date(),
          ...args,
        },
      ];
    });
  };

  const focusNote = (id) => {
    let currentNote=[...notes];
    let index = currentNote.findIndex((n)=>{
      return n.id === id;
    });
    let itemToRemove= currentNote.find((n)=>{
      return n.id === id;
    })
    currentNote.splice(index,1);
    currentNote.push(itemToRemove)
    setNotes(currentNote);
  };

  const removeNote = (id) => {
    setNotes((n) => {
      return n.filter((note) => `${note.id}` !== id);
    });
  };

  const updateNote = (id, note) => {

    setNotes((allNotes) => {
      const newNotes = [...allNotes];
      let currentNote = allNotes.find((note) => `${note.id}` === `${id}`);
      if (currentNote) {
        Object.assign(currentNote, note);
      }
      return newNotes;
    });
  };

  const move = (id, x, y) => {
    updateNote(id, { x, y });
  };

  const resizeNote = (id, x, y, width, height) => {

    updateNote(id, { x, y, width, height });
  };

  function loadNotes() {
    let savedNotes;
    try {
      savedNotes = JSON.parse(localStorage.getItem(noteStoreKey));
    } catch (error) {
      console.error("Could not retrieve saved notes. Restarting");
    }

    return (
        savedNotes || [
          {
            id: 1,
            text: "Hello World",
            x: 0,
            y: 0,
            width: 180,
            height: 180,
            bgColor: "#add8e6",
          },
        ]
    );
  }

  return {
    notes,
    addNote,
    removeNote,
    updateNote,
    move,
    resizeNote,
    focusNote,
  };
}
