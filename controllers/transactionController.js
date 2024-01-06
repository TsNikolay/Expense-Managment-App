const transactionsModel = require("../models/transactionModel");
const moment = require("moment");
const getAllTransactions = async (req, res) => {
  try {
    const { dateRange, chosenDate, type } = req.body;
    const transactions = await transactionsModel.find({
      ...(dateRange !== "custom"
        ? { date: { $gt: moment().subtract(Number(dateRange), "d").toDate() } }
        : { date: { $gte: chosenDate[0], $lte: chosenDate[1] } }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (exception) {
    res.status(500).json(exception);
  }
};

const addTransaction = async (req, res) => {
  try {
    const transaction = new transactionsModel(req.body);
    await transaction.save();
    res.status(201).json("Transaction was created successfully");
  } catch (exception) {
    res.status(500).json(exception);
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionsModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
    res.status(200).json("Transaction was edited successfully");
  } catch (exception) {
    res.status(500).json(exception);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionsModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).json("Transaction was deleted successfully");
  } catch (exception) {
    res.status(500).json(exception);
  }
};

module.exports = { getAllTransactions, addTransaction, editTransaction, deleteTransaction };
