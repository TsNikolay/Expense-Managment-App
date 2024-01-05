import React, { useState, useEffect } from "react";
import Template from "../components/Tamplate/Template";
import styles from "./Homepage.module.css";
import { Modal, message, Table, DatePicker } from "antd";
import axios from "axios";
import Loading from "../components/UI/Loading";
import moment from "moment";
const { RangePicker } = DatePicker;

const Homepage = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [dateRange, setDateRange] = useState("7");
  const [chosenDate, setChosenDate] = useState([]);
  const [type, setType] = useState("any");

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/transactions-get-all", {
          userid: user._id,
          dateRange,
        });
        setLoading(false);
        const transactionsWithIndex = res.data.map((transaction, index) => ({
          ...transaction,
          id: index + 1,
        }));
        setAllTransactions(transactionsWithIndex);
      } catch (exception) {
        setLoading(false);
      }
    };

    getAllTransactions();
  }, [dateRange, chosenDate]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      date: event.target.elements.date.value,
      description: event.target.elements.description.value,
      category: event.target.elements.category.value,
      amount: event.target.elements.amount.value,
      transactionType: event.target.elements.transactionType.value,
    };

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const nextKey = allTransactions.length + 1;

      await axios.post("/transactions/transaction-add", {
        ...formData,
        userid: user._id,
        key: nextKey,
      });
      message.success("Transaction was added successfully");
      setLoading(false);
      setModalVisibility(false);
    } catch (exception) {
      setLoading(false);
      message.error("An error occurred during adding");
    }
  };

  // Таблиця транзакцій
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("DD.MM.YYYY")}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Actions",
      key: "actions",
    },
  ];

  return (
    <Template>
      {loading && <Loading />}
      <div className={styles.filters}>
        <div>
          <h3>Select range of date</h3>
          <select
            className="form-select"
            id="exampleInputDateRange"
            name="dateRange"
            aria-label="Default select example"
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value)}
          >
            <option defaultValue="select"></option>
            <option value="7">Last 1 week</option>
            <option value="30">Last 1 month</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last 1 year</option>
            <option value="custom">Custom</option>
          </select>
          {dateRange === "custom" && (
            <RangePicker value={chosenDate} onChange={(dates) => setChosenDate(dates)} />
          )}
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setModalVisibility(true)}>
            Add new
          </button>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={allTransactions} />
      </div>
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
    </Template>
  );
};

export default Homepage;
