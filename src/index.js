import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";
import { NotesProvider } from "./context/NotesContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <TicketProvider>
      <NotesProvider>
        {" "}
        <App />
      </NotesProvider>
    </TicketProvider>
  </AuthProvider>
);
