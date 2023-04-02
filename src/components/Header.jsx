import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "RESET" });
    localStorage.removeItem("ticketuser");
    navigate("/");
  };
  return (
    <div className="nav">
      <nav className="container nav">
        <Link to="/">
          <h2 className="logo">TicketEase</h2>
        </Link>
        <ul>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
