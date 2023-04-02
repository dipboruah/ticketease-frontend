import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import { AuthContext } from "../context/AuthContext";
import { getNotes, createNote } from "../context/NotesActions";
import { NotesContext } from "../context/NotesContext";
import { closeTicket, getTicket } from "../context/TicketActions";
import { TicketContext } from "../context/TicketContext";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./Ticket.module.css";
function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { user } = useContext(AuthContext);
  const { ticket, dispatch } = useContext(TicketContext);
  const params = useParams();
  const navigate = useNavigate();
  const { notes, dispatch: noteDispatch } = useContext(NotesContext);
  useEffect(() => {
    fetchTicket();
  }, []);
  const customStyles = {
    content: {
      width: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      position: "relative",
    },
  };

  Modal.setAppElement("#root");

  const fetchNotes = async () => {
    try {
      const data = await getNotes(user.token, params.id);
      if (data) {
        noteDispatch({ type: "GET_NOTES", payload: data });
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const fetchTicket = async () => {
    try {
      const data = await getTicket(user.token, params.id);
      if (data) {
        dispatch({ type: "GET_TICKET", payload: data });
      }
      fetchNotes();
    } catch (err) {
      toast.error(err);
    }
  };

  const onNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createNote({ text: noteText }, user.token, params.id);
      if (data) {
        noteDispatch({ type: "CREATE_NOTE", payload: data });
        console.log(data);
        toast.success("Note Created");
        closeModal();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const onTicketClose = async () => {
    try {
      const data = await closeTicket(user.token, ticket._id);

      if (data._id) {
        dispatch({ type: "CLOSE_TICKET", payload: data });
        toast.success("Ticket Closed!");
        navigate("/tickets");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={styles.container}>
      <BackButton url="/tickets" />
      <header className={styles.header}>
        <h2>
          Ticket ID: {ticket._id}
          <span
            className={` ${styles.status} ${
              ticket.status === "new" ? styles.new : ""
            } ${ticket.status === "open" ? styles.new : ""} ${
              ticket.status === "closed" ? styles.closed : ""
            }`}>
            {ticket.status}
          </span>
        </h2>
        <p>
          Date Submitted :{new Date(ticket.createdAt).toLocaleString("en-US")}
        </p>

        <div className={styles.description}>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note">
        <div className={styles.modalHead}>
          {" "}
          <h2>Add comment</h2>
          <button className={styles.closeModal} onClick={closeModal}>
            <AiFillCloseCircle />
          </button>{" "}
        </div>

        <form onSubmit={onNoteSubmit}>
          <div className={styles.formGroup}>
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className={styles.formGroup}>
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <h2 className={styles.commentTitle}>Comments</h2>
      <div className={styles.comments}>
        {notes.length > 0 ? (
          notes.map((note) => <NoteItem key={note._id} note={note} />)
        ) : (
          <p>No comment found !</p>
        )}
      </div>

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className={styles.closeButton}>
          <AiFillCloseCircle />
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
