import useNotes from "../hooks/useNotes";
import { createContext } from "react";

const context = createContext({});

export function Notes({ children }) {
  const noteSettings = useNotes();
  const { notes } = noteSettings;

  return (
    <context.Provider value={{ notes, ...noteSettings }}>
      {children}
    </context.Provider>
  );
}
export default context;
