import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({ notes }) => {
  return (
    <div className="notes-list">
      {notes.map((note,i) => (
        <Note
          key={note.id}
          note={note}
          zIndex={i}
        />
      ))}
      <AddNote />
    </div>
  );
};

export default NotesList;
