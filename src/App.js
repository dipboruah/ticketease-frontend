import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import NewTicket from "./pages/NewTicket";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" exact element={user ? <Home /> : <Login />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route
              path="/new-ticket"
              element={user ? <NewTicket /> : <Login />}
            />
            <Route path="/tickets" element={user ? <Tickets /> : <Login />} />
            <Route path="/ticket/:id" element={user ? <Ticket /> : <Login />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
