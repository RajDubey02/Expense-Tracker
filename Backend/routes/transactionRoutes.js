const express = require('express');
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require('../controllers/transactionController');

const router = express.Router();

router
  .route('/')
  .get(getTransactions)
  .post(createTransaction);

router.get('/summary', getSummary);

router
  .route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
