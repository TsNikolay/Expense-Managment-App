import React, { useState } from "react";
import Template from "../components/Tamplate/Template";
import styles from "./Homepage.module.css";
import { Modal, message } from "antd";
import axios from "axios";
import Loading from "../components/UI/Loading";

const Homepage = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      date: event.target.elements.date.value,
      description: event.target.elements.description.value,
      category: event.target.elements.category.value,
      amount: event.target.elements.amount.value,
      transactionType: event.target.elements.transactionType.value,
    };
    console.log(formData);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/transactions/transaction-add", { ...formData, userid: user._id });
      message.success("Transaction was added successfully");
      setLoading(false);
      setModalVisibility(false);
    } catch (exception) {
      setLoading(false);
      message.error("An error occured during adding");
    }
  };

  return (
    <Template>
      {loading && <Loading />}
      <div className={styles.filters}>
        <div>filters</div>
        <div>
          <button className="btn btn-primary" onClick={() => setModalVisibility(true)}>
            Add new
          </button>
        </div>
      </div>
      <div>
        <Modal
          title="Add transaction"
          open={modalVisibility}
          onCancel={() => setModalVisibility(false)}
          footer={false}
        >
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputTransactionType" className="form-label">
                Transaction Type
              </label>
              <select
                className="form-select"
                id="exampleInputTransactionType"
                name="transactionType"
                aria-label="Default select example"
              >
                <option defaultValue="select"></option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputDate1" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="exampleInputDate1"
                name="date"
                aria-describedby="dateHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputDescription1" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputDescription1"
                name="description"
                aria-describedby="descriptionHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputCategory1" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputCategory1"
                name="category"
                aria-describedby="categoryHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAmount1" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputAmount1"
                name="amount"
                aria-describedby="amountHelp"
                step="any"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal>
      </div>
    </Template>
  );
};

export default Homepage;
