const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

//POST (add transaction)
router.post("/transaction-add", addTransaction);

//POST (edit transaction)
router.post("/transaction-edit", editTransaction);

//POST (delete transaction)
router.post("/transaction-delete", deleteTransaction);

//POST (get all transaction)
router.post("/transactions-get-all", getAllTransactions);

module.exports = router;
