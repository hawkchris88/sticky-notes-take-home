import { useEffect, useRef, useState } from "react";
import useNotes from "./useNotes";

export const useDragging = ({ note}) => {
  const [isDragging] = useState(false);
  const ref = useRef(null);

  const { focusNote } = useNotes();

  useEffect(() => {
    function onDragStart(e) {
      e.dataTransfer.setData("id", note.id);
      e.dataTransfer.setData("x", ref.current.offsetWidth / 2);
      e.dataTransfer.setData("y", ref.current.offsetHeight / 2)
    }
    let refObserver= ref.current;
    refObserver.addEventListener("dragstart", onDragStart);
    return () => {
      if (refObserver)
        refObserver.removeEventListener("dragstart", onDragStart);
    };
  }, [focusNote,note.id]);

  return [ref, isDragging];
};
