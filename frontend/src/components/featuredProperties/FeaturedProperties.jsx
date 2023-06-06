import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";
import styles from "./featuredProperties.module.css";

import { ROOM_DEFAULT } from "../../mockData";

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className={styles.fp}>
      <>
        {loading ? (
          <div className={styles.loading}>
            <Loader size="md" content="Loading..." />
          </div>
        ) : (
          data?.map((item, i) => (
            <div
              key={item.id}
              className={styles.fpItem}
              onClick={() => navigate(`/hotels/${item.id}`)}
            >
              <img
                src={
                  (item?.photos && item.photos.split(",")[i]) || ROOM_DEFAULT
                }
                alt=""
              />
              <span className={styles.fpName}>{item.name}</span>
              <span className={styles.fpCity}>{item.city}</span>
              <span className={styles.fpPrice}>
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className={styles.fpRating}>
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))
        )}
      </>
    </div>
  );
}
