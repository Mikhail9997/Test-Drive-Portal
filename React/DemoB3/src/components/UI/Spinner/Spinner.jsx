import React from "react";
import styles from "./Spinner.module.css";

function Spinner({ size = "large", color = "primary", center = false }) {
  const spinnerClasses = [
    styles.spinner,
    styles[size],
    styles[color],
    center ? styles.center : "",
  ].join(" ");
  return (
    <div className={spinnerClasses}>
      <div className={styles.srOnly}> Загрузка...</div>
    </div>
  );
}

export default Spinner;
