import { useContext, useState } from "react";

import NoteContext from "../contexts/NoteContext";

const AddNote = () => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 400;

  const { addNote } = useContext(NoteContext);

  const handleChange = (event) => {
    setNoteText(event.target.value.substring(0, characterLimit));
  };

  const handleSaveClick = () => {
    addNote({ text: noteText });
    setNoteText("");
  };

  return (
    <div className="note new">
      <textarea
    rows="8"
    cols="10"
    placeholder="Type to add a note..."
    value={noteText}
    onChange={handleChange}
    />
      <div className="note-footer">
        <small>{characterLimit - noteText.length} Remaining</small>
        <button
          disabled={noteText.trim().length === 0}
          className="save"
          onClick={handleSaveClick}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddNote;
