import { useDragging } from "../hooks/useDragging";
import { ResizeableBorder } from "./ResizebleBorder/ResizeableBorder";
import NoteContext from "../contexts/NoteContext";
import { useContext } from "react";

const Note = ({ note,zIndex }) => {
  const {
    text,
    width = 200,
    height = 200,
    x,
    y,
    bgColor,
  } = note;
  const [ref] = useDragging({ note });

  const { updateNote, focusNote } = useContext(NoteContext);

  const updateText = (e) => {
    const text = e.target.innerText;
    updateNote(note.id, {
      text,
    });
  };

  const updateColor = (e) => {
    const color = e.target.value;
    updateNote(note.id, {
      bgColor: color,
    });
  };
  const handleMouseDown = () => {
    focusNote(note.id);
  };

  return (
    <div
      className="note-container"
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <ResizeableBorder note={note} />
      <div
        className="note"
        draggable={true}
        ref={ref}
        style={{ background: bgColor }}
      >
        <p
          contentEditable={true}
          onInput={updateText}
          suppressContentEditableWarning={true}
          className="note-text"
        >
          {text}
        </p>
        <div className="note-footer">
          <input type="color" defaultValue={bgColor} onChange={updateColor} />
        </div>
      </div>
    </div>
  );
};

export default Note;
