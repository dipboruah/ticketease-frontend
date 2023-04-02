import React from "react";
import { Link } from "react-router-dom";
import styles from "./TicketItem.module.css";
import { FaEye } from "react-icons/fa";
function TicketItem({ ticket, number }) {
  return (
    <div className={styles.ticket}>
      <div>{number}</div>
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.products}</div>
      <div
        className={` ${styles.status} ${
          ticket.status === "new" ? styles.new : ""
        } ${ticket.status === "open" ? styles.new : ""} ${
          ticket.status === "closed" ? styles.closed : ""
        }`}>
        {ticket.status}
      </div>
      <div>
        <Link to={`/ticket/${ticket._id}`} className="btn">
          <FaEye />
          View
        </Link>
      </div>
    </div>
  );
}

export default TicketItem;
