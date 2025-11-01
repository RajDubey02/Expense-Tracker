const express = require('express');
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
  bulkUploadTransactions,
} = require('../controllers/transactionController');
const upload = require('../config/multer'); // multer config

const router = express.Router();

router
  .route('/')
  .get(getTransactions)
  .post(createTransaction);



router.post('/bulk-upload', upload.single('file'), bulkUploadTransactions);

router.get('/summary', getSummary);

router
  .route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
