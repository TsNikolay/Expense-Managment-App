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

module.exports = { getAllTransactions, addTransaction };
