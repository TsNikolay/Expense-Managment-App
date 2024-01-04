const express = require("express");
const { addTransaction, getAllTransactions } = require("../controllers/transactionController");

const router = express.Router();

//POST (add transaction)
router.post("/transaction-add", addTransaction);

//GET (get all transaction)
router.get("/transactions-get-all", getAllTransactions);

module.exports = router;
