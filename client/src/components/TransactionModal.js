import React from "react";
import moment from "moment";
import { Modal } from "antd";

const TransactionModal = ({
  beingEdited,
  setModalVisibility,
  modalVisibility,
  submitHandler,
}) => {
  return (
    <Modal
      title={beingEdited ? "Edit Transaction" : "Add transaction"}
      open={modalVisibility}
      onCancel={() => {
        setModalVisibility(false);
      }}
      footer={false}
      closable={beingEdited ? false : true}
    >
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputTransactionType" className="form-label">
            Transaction Type
          </label>
          <select
            className="form-select"
            id="exampleInputTransactionType"
            name="type"
            aria-label="Default select example"
            defaultValue={beingEdited ? beingEdited.type : ""}
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
            defaultValue={
              beingEdited ? moment(beingEdited.date).format("YYYY-MM-DD") : ""
            }
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
            defaultValue={beingEdited ? beingEdited.description : ""}
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
            defaultValue={beingEdited ? beingEdited.category : ""}
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
            defaultValue={beingEdited ? beingEdited.amount : ""}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default TransactionModal;
