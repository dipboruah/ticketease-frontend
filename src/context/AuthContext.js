import { createContext, useEffect, useReducer, useState } from "react";
import { AuthReducer } from "./AuthReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggesIn, setLoggedIn] = useState(false);
  const initialState = {
    user: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ticketuser"));
    if (user) {
      setLoggedIn(true);
      initialState.user = user;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loggesIn }}>
      {children}
    </AuthContext.Provider>
  );
};
