import useFetch from "../../hooks/useFetch";
import { Loader } from "rsuite";
import styles from "./featured.module.css";

export default function Featured() {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=Mumbai,Pune,Bangalore"
  );

  return (
    <div className={styles.featured}>
      {loading ? (
        <div className={styles.loading}>
          <Loader size="md" content="Loading..." />
        </div>
      ) : (
        <>
          <div className={styles.featuredItem}>
            <img src="/assets/images/mumbai.jpg" alt="" />
            <div className={styles.featuredTitle}>
              <span>Mumbai</span>
              <span>{data[0]} properties</span>
            </div>
          </div>
          <div className={styles.featuredItem}>
            <img src="/assets/images/pune.jpg" alt="" />
            <div className={styles.featuredTitle}>
              <span>Pune</span>
              <span>{data[1]} properties</span>
            </div>
          </div>
          <div className={styles.featuredItem}>
            <img src="/assets/images/bangalore.jpg" alt="" />
            <div className={styles.featuredTitle}>
              <span>Bangalore</span>
              <span>{data[2]} properties</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
