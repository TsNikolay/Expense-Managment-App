const transactionsModel = require("../models/transactionModel");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionsModel.find({ userid: req.body.userid });
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

module.exports = { getAllTransactions, addTransaction };
