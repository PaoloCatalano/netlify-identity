import { useEffect, useContext } from "react";
import styles from "../styles/Guides.module.css";
import AuthContext from "../stores/authContext";

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);

  useEffect(() => {
    console.log(authReady);
    if (authReady) {
      fetch("/.netlify/functions/guides", {
        headers: {
          Authorization: "Bearer " + user.token.access_token,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [user]);

  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div>
  );
}
