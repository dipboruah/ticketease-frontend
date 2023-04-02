import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { createTicket } from "../context/TicketActions";
import { TicketContext } from "../context/TicketContext";
import styles from "./NewTicket.module.css";
function NewTicket() {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(TicketContext);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [products, setProduct] = useState("iPad");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createTicket({ products, description }, user.token);
      if (data.user) {
        dispatch({ type: "CREATE_TICKET", payload: data });
        toast.success("Ticket created");
        navigate("/tickets");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.heading}>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={products}
              onChange={(e) => setProduct(e.target.value)}>
              <option value="iPhone">iPhone</option>
              <option value="macbook">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className={styles.formGroup}>
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewTicket;
