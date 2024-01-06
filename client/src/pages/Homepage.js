import React, { useState, useEffect } from "react";
import Template from "../components/Tamplate/Template";
import Filters from "../components/Filters";
import Charts from "../components/Charts";
import TransactionModal from "../components/TransactionModal";
import axios from "axios";
import Loading from "../components/UI/Loading";
import { message, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const Homepage = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [dateRange, setDateRange] = useState("365");
  const [chosenDate, setChosenDate] = useState([]);
  const [type, setType] = useState("all");
  const [dataVisualization, setDataVisualization] = useState("table");
  const [beingEdited, setBeingEdited] = useState(null);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/transactions-get-all", {
          userid: user._id,
          dateRange,
          chosenDate,
          type,
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
  }, [dateRange, chosenDate, type]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      date: event.target.elements.date.value,
      description: event.target.elements.description.value,
      category: event.target.elements.category.value,
      amount: event.target.elements.amount.value,
      type: event.target.elements.type.value,
    };

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const nextKey = allTransactions.length + 1;
      if (beingEdited) {
        await axios.post("/transactions/transaction-edit", {
          payload: {
            ...formData,
            userid: user._id,
            key: nextKey,
          },
          transactionId: beingEdited._id,
        });
        message.success("Transaction was edited successfully");
        setLoading(false);
      } else {
        await axios.post("/transactions/transaction-add", {
          ...formData,
          userid: user._id,
          key: nextKey,
        });
        message.success("Transaction was added successfully");
        setLoading(false);
      }
      setModalVisibility(false);
      setBeingEdited(false);
    } catch (exception) {
      setLoading(false);
      message.error("An error occurred during adding");
    }
  };

  const deleteHandler = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transactions/transaction-delete", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction was deleted successfully");
    } catch (error) {
      setLoading(false);
      message.error("An error occurred during deleting");
    }
  };

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
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setBeingEdited(record);
              setModalVisibility(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              deleteHandler(record);
            }}
          />
        </div>
      ),
      key: "actions",
    },
  ];

  return (
    <Template>
      <Filters
        dateRange={dateRange}
        setDateRange={setDateRange}
        chosenDate={chosenDate}
        setChosenDate={setChosenDate}
        type={type}
        setType={setType}
        dataVisualization={dataVisualization}
        setDataVisualization={setDataVisualization}
        setModalVisibility={setModalVisibility}
      />
      <div>
        {dataVisualization === "table" ? (
          <Table columns={columns} dataSource={allTransactions} />
        ) : (
          <Charts data={allTransactions} />
        )}
      </div>
      <TransactionModal
        beingEdited={beingEdited}
        setModalVisibility={setModalVisibility}
        modalVisibility={modalVisibility}
        submitHandler={submitHandler}
      />
      {loading && <Loading />}
    </Template>
  );
};

export default Homepage;
