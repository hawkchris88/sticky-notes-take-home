import { useContext, useRef, useState } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import NoteContext from "./contexts/NoteContext";
import trash from "./assets/trash.png";

const App = () => {
  const { notes, removeNote, updateNote } = useContext(NoteContext);
  const trashRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const _deleteNote = (e) => {
    const id = e.dataTransfer.getData("id");
    removeNote(id);
    _resetTrashTarget(e);
  };

  const _allowDropTrash = (e) => {
    e.preventDefault();
    if (trashRef.current) {
      trashRef.current.style.backgroundColor = "#DC3535";
      trashRef.current.style.height = "8rem";
    }
  };

  const _resetTrashTarget = () => {
    if (trashRef.current) {
      trashRef.current.style.backgroundColor = darkMode ? "grey" : "#aeaeae";
      trashRef.current.style.height = "6rem";
    }
  };

  const _allowDrop = (e) => {
    e.preventDefault();
  };



  const moveNote = (e) => {
    const id = e.dataTransfer.getData("id");
    const width = e.dataTransfer.getData("x");
    const height = e.dataTransfer.getData("y");
    const x = Math.abs(e.clientX - width);
    const y = Math.abs(e.clientY - height);

    updateNote(id, { x, y });
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container" onDragOver={_allowDrop} onDrop={moveNote}>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
        />
      </div>
      {notes.length > 0 && (
          <div
             className="trash"
              onDrop={_deleteNote}
              onDragOver={_allowDropTrash}
              onDragLeave={_resetTrashTarget}
              ref={trashRef}
          >

           Drag here to delete trash
            <img src={trash} alt="" />

          </div>
      )}
    </div>
  );
};

export default App;
