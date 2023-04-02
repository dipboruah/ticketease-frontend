import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";
import { AuthContext } from "../context/AuthContext";
import { getTickets } from "../context/TicketActions";
import { TicketContext } from "../context/TicketContext";
import styles from "./Tickets.module.css";
function Tickets() {
  const { user } = useContext(AuthContext);
  const { tickets, dispatch } = useContext(TicketContext);

  const fetchTicket = async () => {
    try {
      const data = await getTickets(user.token);
      if (data) {
        dispatch({ type: "GET_TICKETS", payload: data });
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  if (!tickets) {
    return <>Looading...!</>;
  }

  return (
    <div className={styles.container}>
      <BackButton />
      <h2>Tickets</h2>

      {tickets.length > 0 ? (
        <div className={styles.tickets}>
          <div className={styles.ticketHeadings}>
            <div>Sl No:</div>
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {tickets.map((ticket, index) => (
            <TicketItem key={ticket._id} ticket={ticket} number={index + 1} />
          ))}
        </div>
      ) : (
        <p>No ticket found..!</p>
      )}
    </div>
  );
}

export default Tickets;
