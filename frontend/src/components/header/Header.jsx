import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faMountainSun,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";

import Search from "../search/Search";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header({ type }) {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <div
        className={
          type !== "list"
            ? styles.container
            : `${styles.container} ${styles.listMode}`
        }
      >
        <div className={styles.list}>
          <div className={`${styles.item} ${styles.active}`}>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className={styles.item}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className={styles.item}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className={styles.item}>
            <FontAwesomeIcon icon={faMountainSun} />
            <span>Attractions</span>
          </div>
          <div className={styles.item}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className={styles.title}>Find your next stay</h1>
            <p className={styles.desc}>
              Search low prices on hotels, homes and much more...
            </p>
            {!user && (
              <Link to="/login">
                <button className={styles.headerBtn}>Sign in / Register</button>
              </Link>
            )}
            <Search />
          </>
        )}
      </div>
    </div>
  );
}
