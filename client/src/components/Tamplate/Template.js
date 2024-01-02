import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Template.module.css";
const Template = (props) => {
  return (
    <div>
      <Header />
      <div className={styles.content}> {props.children}</div>
      <Footer />
    </div>
  );
};

export default Template;
