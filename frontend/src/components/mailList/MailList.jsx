import { useState } from "react";
import styles from "./mailList.module.css";

export default function MailList() {
  const [subscribe, setSubscribe] = useState(false);
  const [mail, setMail] = useState("");

  const handleSubscribe = () => {
    if (!mail) return;
    if (!mail.includes("@")) return;
    setSubscribe(true);
    setMail("");
  };

  return (
    <div className={styles.mail}>
      <h1 className={styles.mailTitle}>Save time, save money!</h1>
      <span className={styles.mailDesc}>
        Sign up and we'll send the best deals to you
      </span>
      <div className={styles.mailInputContainer}>
        <input
          value={mail}
          onChange={({ target }) => setMail(target.value)}
          type="email"
          placeholder="Your Email"
        />
        <button onClick={handleSubscribe} disabled={subscribe}>
          {!subscribe ? "Subscribe" : "Subscribed"}
        </button>
      </div>
    </div>
  );
}
