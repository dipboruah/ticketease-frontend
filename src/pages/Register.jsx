import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register } from "../context/AuthActions";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const { user, loading, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password doesn't match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      //registerUser
      try {
        const data = await register(userData);

        if (data) {
          localStorage.setItem("ticketuser", JSON.stringify(data));
          dispatch({ type: "REGISTER", payload: data });
          toast.success("Registered");
          navigate("/");
        }
      } catch (err) {
        dispatch({ type: "RESET" });
        toast.error(err);
      }
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
        <h2>Register</h2>
        <p>Please register to get start</p>
        <div className={styles.form}>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter your name"
                required
              />
            </div>
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
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Confirm password"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <button className="btn btn-login">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
