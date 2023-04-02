import { createContext, useReducer } from "react";
import { TicketReducer } from "./TicketReducer";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const initialState = {
    tickets: [],
    ticket: {},
  };
  const [state, dispatch] = useReducer(TicketReducer, initialState);
  return (
    <TicketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
};
