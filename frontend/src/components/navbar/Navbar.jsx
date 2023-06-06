import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("/auth/logout");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Booking.com
        </Link>
        {user ? (
          <div className={styles.items}>
            <span className={styles.username}>{user.username}</span>
            <button onClick={handleLogout} className={styles.logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={styles.items}>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
