const transactionsModel = require("../models/transactionModel");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionsModel.find({});
    res.status(200).json(transactions);
  } catch (exception) {
    res.status(500).json(exception);
  }
};

const addTransaction = async (res, req) => {
  try {
    const transaction = new transactionsModel(req.body);
    await transaction.save();
    res.status(201).json("Transaction was created successfully");
  } catch (exception) {
    res.status(500).json(exception);
  }
};

module.exports = { getAllTransactions, addTransaction };
