import useFetch from "../../hooks/useFetch";
import { IMAGES } from "../../mockData";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";
import styles from "./propertyList.module.css";

export default function PropertyList() {
  const { data, loading } = useFetch("/hotels/countByType");

  const navigate = useNavigate();
  return (
    <div className={styles.pList}>
      {loading ? (
        <div className={styles.loading}>
          <Loader size="md" content="Loading..." />
        </div>
      ) : (
        <>
          {data?.map((item, i) => (
            <div
              key={i}
              className={styles.pListItem}
              onClick={() => navigate("/hotels")}
            >
              <img src={IMAGES[i]} alt="" />
              <div className={styles.pListTitles}>
                <span>{data[i]?.type}</span>
                <span>
                  {data[i]?.count} {data[i]?.type}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
