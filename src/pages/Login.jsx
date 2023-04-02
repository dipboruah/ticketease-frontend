import styles from "./Login.module.css";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../context/AuthActions";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      const data = await login(userData);
      if (data) {
        localStorage.setItem("ticketuser", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        toast.success("Logged in!");
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "RESET" });
      toast.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>Simplify Your Workday </h1>
        <h1>
          With Our <span>TicketEase</span> App
        </h1>
      </div>

      <div className={styles.login}>
        <h2>Login</h2>
        <p>Please login to get support</p>
        <div className={styles.form}>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <button className="btn btn-login">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
