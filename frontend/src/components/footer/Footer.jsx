import styles from "./footer.module.css";

export default function Footer({ type }) {
  return (
    <div
      className={
        type !== "hotel" ? styles.footer : `${styles.footer} ${styles.hotel}`
      }
    >
      <div className={styles.fLists}>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Countries</li>
          <li className={styles.fListItem}>Regions</li>
          <li className={styles.fListItem}>Cities</li>
          <li className={styles.fListItem}>Districts</li>
          <li className={styles.fListItem}>Airports</li>
          <li className={styles.fListItem}>Hotels</li>
        </ul>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Countries</li>
          <li className={styles.fListItem}>Regions</li>
          <li className={styles.fListItem}>Cities</li>
          <li className={styles.fListItem}>Districts</li>
          <li className={styles.fListItem}>Airports</li>
          <li className={styles.fListItem}>Hotels</li>
        </ul>
        <ul className={styles.fList}>
          <li className={styles.fListItem}>Countries</li>
          <li className={styles.fListItem}>Regions</li>
          <li className={styles.fListItem}>Cities</li>
          <li className={styles.fListItem}>Districts</li>
          <li className={styles.fListItem}>Airports</li>
          <li className={styles.fListItem}>Hotels</li>
        </ul>
      </div>
      <span className="fText">Copyright © 1996–2022 Booking.com™</span>
    </div>
  );
}
