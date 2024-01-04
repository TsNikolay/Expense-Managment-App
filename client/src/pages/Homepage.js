import React, { useState } from "react";
import Template from "../components/Tamplate/Template";
import styles from "./Homepage.module.css";
import { Modal } from "antd";
const Homepage = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <Template>
      <div className={styles.filters}>
        <div>filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setModalVisibility(true)}
          >
            Add new
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <Modal
          title="Add transaction"
          open={modalVisibility}
          onCancel={() => setModalVisibility(false)}
          footer={false}
        >
          Content
        </Modal>
      </div>
    </Template>
  );
};

export default Homepage;
