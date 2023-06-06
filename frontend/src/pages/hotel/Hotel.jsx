import styles from "./hotel.module.css";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { Loader } from "rsuite";

import { ROOM_DEFAULT } from "../../mockData.js";
import { useEffect } from "react";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export default function Hotel() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hotelId = pathname.split("/")[2];

  // scroll to top on load
  useEffect(() => window.scrollTo(0, 0), []);

  let PHOTOS = Array(6).fill(ROOM_DEFAULT);
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`/hotels/${hotelId}`);

  if (data.photos && data.photos.split(",").length) {
    PHOTOS = data.photos.split(",");
  }

  const { dates, options } = useContext(SearchContext);

  const dayDifference = (dateOne, dateTwo) => {
    const timeDiff = Math.abs(dateTwo.getTime() - dateOne.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const stayDays = dayDifference(dates[0], dates[1]);

  const [showSilder, setShowSlider] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const handleSlider = (i) => {
    setSlideNumber(i);
    setShowSlider(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? PHOTOS.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === PHOTOS.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleReserve = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.hotel}>
      <Navbar />
      <Header type="list" />
      {showSilder && (
        <div className={styles.slider}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => setShowSlider(false)}
            className={styles.close}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className={styles.arrow}
            onClick={() => handleMove("l")}
          />
          <div className={styles.sliderWrapper}>
            <img src={PHOTOS[slideNumber]} alt="" />
          </div>

          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className={styles.arrow}
            onClick={() => handleMove("r")}
          />
        </div>
      )}
      {loading ? (
        <div className={styles.hotelLoading}>
          <Loader size="lg" content="Loading..." vertical />
        </div>
      ) : (
        <div className={styles.hotelContainer}>
          <div className={styles.hotelWrapper}>
            <button onClick={handleReserve} className={styles.bookNowBtn}>
              Reserve or Book Now!
            </button>
            <h1 className={styles.hotelTitle}>{data.name}</h1>
            <div className={styles.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className={styles.hotelDistance}>
              Excellent location - {data.distance}m from center
            </span>
            <span className={styles.hotelPriceHighlight}>
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className={styles.hotelImages}>
              {PHOTOS.map((photo, i) => (
                <div key={i} className={styles.hotelImgWrapper}>
                  <img
                    onClick={() => handleSlider(i)}
                    src={photo}
                    alt=""
                    className={styles.hotelImg}
                  />
                </div>
              ))}
            </div>
            <div className={styles.hotelDetails}>
              <div className={styles.hotelDetailsText}>
                <h2 className={styles.hotelTitle}>{data.title}</h2>
                <p className={styles.hotelDesc}>{data.desc}</p>
              </div>
              <div className={styles.hotelDetailsPrice}>
                <h1>Perfect for a {stayDays}-night stay!</h1>
                {data.rating && (
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of {data.rating}!
                  </span>
                )}
                <h3>
                  <b>${data.cheapestPrice * stayDays * options.room}</b> (
                  {stayDays} nights)
                </h3>
                <button onClick={handleReserve}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer type="hotel" />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={hotelId} />}
    </div>
  );
}
