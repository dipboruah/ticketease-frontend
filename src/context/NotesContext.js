import { createContext, useReducer } from "react";
import { NotesReducer } from "./NotesReducer";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const initialState = {
    notes: [],
    note: {},
  };
  const [state, dispatch] = useReducer(NotesReducer, initialState);
  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
