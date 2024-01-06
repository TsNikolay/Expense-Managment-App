import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={`text-dark p-4 ${styles.footerContainer}`}>
      <h6 className="text-center">Developed in 2024</h6>
    </div>
  );
};

export default Footer;
