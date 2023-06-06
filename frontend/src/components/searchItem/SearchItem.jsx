import { Link } from "react-router-dom";
import styles from "./searchItem.module.css";

export default function SearchItem({ item }) {
  return (
    <div className={styles.searchItem}>
      <div className={styles.siImg}>
        <img
          src={
            (item.photos && item.photos.split(",")[item.id % 6]) ||
            "/assets/images/room-default.jpg"
          }
          alt=""
        />
      </div>
      <div className={styles.siDesc}>
        <Link className={styles.hotelLink} to={`/hotels/${item.id}`}>
          <h2 className={styles.siTitle}>{item.name}</h2>
        </Link>
        <span className={styles.siDistance}>{item.distance}m from center</span>
        <span className={styles.siTaxiOp}>Free airport taxi</span>
        <span className={styles.siSubtitle}>
          {item.desc.length > 200 ? item.desc.slice(0, 100) + "..." : item.desc}
        </span>
        <span className={styles.siFeatures}>
          Entire studio • 1 bathroomm • 21m² • 1 full bed
        </span>
        <span className={styles.siCancelOp}>Free cancellation</span>
        <span className={styles.cancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={styles.siDetails}>
        {item.rating && (
          <div className={styles.siRating}>
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className={styles.siDetailText}>
          <span className={styles.siPrice}>${item.cheapestPrice}</span>
          <span className={styles.siTaxOp}>Includes taxes and fees</span>
          <Link to={`/hotels/${item.id}`}>
            <button>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
