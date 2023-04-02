import styles from "./Home.module.css";
import { FaTicketAlt } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className={styles.container}>
      <h1>What do you need help with?</h1>
      <h2>Please choose from an option below</h2>
      <Link to="new-ticket" className={styles.btnCreate}>
        {" "}
        <BiMessageSquareAdd />
        Create ticket
      </Link>
      <Link to="tickets" className={styles.btnView}>
        <FaTicketAlt />
        View ticket
      </Link>
    </div>
  );
}

export default Home;
