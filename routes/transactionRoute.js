const express = require("express");
const { addTransaction, getAllTransactions } = require("../controllers/transactionController");

const router = express.Router();

//POST (add transaction)
router.post("/transaction-add", addTransaction);

//POST (get all transaction)
router.post("/transactions-get-all", getAllTransactions);

module.exports = router;
