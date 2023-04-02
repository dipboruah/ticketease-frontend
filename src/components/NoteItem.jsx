import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { RiMessage3Fill } from "react-icons/ri";
import styles from "./NotesItem.module.css";
function NoteItem({ note }) {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.notes}>
      <div className={styles.heading}>
        <h3>
          <RiMessage3Fill />
          Comment from{" "}
          {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
        </h3>
        <p>{note.text}</p>
      </div>
      <div className="note-date">
        <p>Time</p>
        {new Date(note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default NoteItem;
