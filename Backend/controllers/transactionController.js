const Transaction = require('../models/Transaction');
const XLSX = require('xlsx');




function toLocalMidnight(d) {
  const nd = new Date(d);
  nd.setHours(0, 0, 0, 0);
  return nd;
}

function parseExcelDate(val) {
  if (!val) return null;

  // Excel serial date (e.g., 45345)
  if (typeof val === 'number') {
    return new Date((val - 25569) * 86400 * 1000);
  }

  // String date
  if (typeof val === 'string') {
    const parsed = new Date(val.trim());
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

// Create new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body;
    const transaction = await Transaction.create({ type, amount, description, category, date });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

function toLocalMidnight(d) {
  const nd = new Date(d);
  nd.setHours(0, 0, 0, 0);
  return nd;
}




// Helper function to check for duplicate transactions
const isDuplicateTransaction = async (transaction) => {
  const existing = await Transaction.findOne({
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description,
    date: {
      $gte: new Date(transaction.date.setHours(0, 0, 0, 0)),
      $lt: new Date(transaction.date.setHours(23, 59, 59, 999))
    }
  });
  return !!existing;
};

exports.bulkUploadTransactions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded.' 
      });
    }

    const workbook = XLSX.read(req.file.buffer, { 
      type: 'buffer', 
      cellDates: true,
      cellNF: true,
      cellText: false
    });
    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { 
      raw: false, 
      defval: '',
      dateNF: 'yyyy-mm-dd',
      blankrows: false,
      skipHidden: true
    });

    if (rows.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'File is empty.' 
      });
    }

    // Required columns with case-insensitive matching
    const requiredCols = ['type', 'amount', 'description', 'category', 'date'];
    const headers = Object.keys(rows[0]).map(h => h.trim().toLowerCase());
    const missing = requiredCols.filter(col => !headers.includes(col));
    
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required columns: ${missing.join(', ')}`,
        required: requiredCols
      });
    }

    const validTransactions = [];
    const errors = [];
    const duplicates = [];

    // Process rows in parallel for better performance
    await Promise.all(rows.map(async (row, idx) => {
      const rowNum = idx + 2; // Excel row number
      try {
        // Case-insensitive field access
        const getField = (field) => {
          const key = Object.keys(row).find(k => k.trim().toLowerCase() === field.toLowerCase());
          return key ? row[key] : '';
        };

        const raw = {
          type: (getField('type') || '').toString().trim().toLowerCase(),
          amount: getField('amount'),
          description: (getField('description') || '').toString().trim(),
          category: (getField('category') || '').toString().trim(),
          date: parseExcelDate(getField('date'))
        };

        // === Validation ===
        if (!['income', 'expense'].includes(raw.type)) {
          throw new Error(`Type must be 'income' or 'expense'. Got: '${raw.type}'`);
        }

        const amount = parseFloat(String(raw.amount).replace(/[^0-9.-]+/g, ''));
        if (isNaN(amount) || amount <= 0) {
          throw new Error('Amount must be a positive number');
        }

        if (!raw.description) {
          throw new Error('Description is required');
        }

        if (!(raw.date instanceof Date) || isNaN(raw.date.getTime())) {
          throw new Error('Invalid date format. Please use YYYY-MM-DD');
        }

        const transaction = {
          type: raw.type,
          amount,
          description: raw.description,
          category: raw.category || 'Uncategorized',
          date: raw.date,
          user: req.user?._id, // Assuming you have user authentication
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Check for duplicates
        if (await isDuplicateTransaction(transaction)) {
          duplicates.push(`Row ${rowNum}: Duplicate transaction found`);
          return;
        }

        validTransactions.push(transaction);
      } catch (error) {
        errors.push(`Row ${rowNum}: ${error.message}`);
      }
    }));

    // If there are validation errors, return them without processing
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors in uploaded file',
        errorCount: errors.length,
        errors: errors.slice(0, 50), // Limit number of errors in response
        hasMoreErrors: errors.length > 50
      });
    }

    // If there are valid transactions, save them
    if (validTransactions.length > 0) {
      try {
        const result = await Transaction.insertMany(validTransactions, { ordered: false });
        
        return res.status(201).json({
          success: true,
          message: 'Bulk upload successful',
          totalProcessed: validTransactions.length,
          insertedCount: result.length,
          duplicatesFound: duplicates.length,
          duplicates: duplicates.length > 0 ? duplicates : undefined
        });
      } catch (error) {
        console.error('Bulk insert error:', error);
        if (error.writeErrors) {
          const failed = error.writeErrors.map(e => e.err.errmsg);
          return res.status(400).json({
            success: false,
            message: 'Partial insert failed',
            insertedCount: error.result?.nInserted || 0,
            failedCount: error.writeErrors.length,
            failed: failed.slice(0, 10)
          });
        }
        throw error;
      }
    }

    // If no valid transactions and no errors (only duplicates)
    if (duplicates.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No new transactions to import (all are duplicates)',
        duplicatesFound: duplicates.length,
        duplicates: duplicates.slice(0, 50),
        hasMoreDuplicates: duplicates.length > 50
      });
    }

    // Fallback case (shouldn't normally reach here)
    return res.status(400).json({
      success: false,
      message: 'No valid transactions found in the file'
    });

  } catch (error) {
    console.error('Bulk upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing bulk upload',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all/filter transactions
exports.getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) filter.date = {};
    if (startDate) {
      const start = toLocalMidnight(new Date(startDate));
      filter.date.$gte = start;
    }
    if (endDate) {
      const end = toLocalMidnight(new Date(endDate));
      const nextDay = new Date(end);
      nextDay.setDate(nextDay.getDate() + 1);
      filter.date.$lt = nextDay; // inclusive
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Summary totals and monthly history (supports filters and configurable last N months)
exports.getSummary = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    const monthsParam = parseInt(req.query.months, 10);
    const months = Number.isFinite(monthsParam) && monthsParam > 0 ? Math.min(monthsParam, 24) : 6; // cap to 24 months

    const now = toLocalMidnight(new Date());

    // Build match filter
    const match = {};
    if (type) match.type = type;
    if (category) match.category = category;
    if (startDate || endDate) match.date = {};
    if (startDate) match.date.$gte = toLocalMidnight(new Date(startDate));
    if (endDate) {
      const end = toLocalMidnight(new Date(endDate));
      const next = new Date(end);
      next.setDate(next.getDate() + 1);
      match.date.$lt = next;
    }

    // Determine default range start if no explicit start provided
    const defaultStart = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
    const rangeStart = match.date?.$gte ? match.date.$gte : defaultStart;

    // Totals (respecting filters)
    const totalsAgg = [];
    if (Object.keys(match).length) totalsAgg.push({ $match: match });
    totalsAgg.push({
      $group: {
        _id: null,
        totalIncome: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
        totalExpense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } },
      },
    });
    totalsAgg.push({ $project: { _id: 0, totalIncome: 1, totalExpense: 1, net: { $subtract: ['$totalIncome', '$totalExpense'] } } });

    const [totals] = await Transaction.aggregate(totalsAgg);

    // Monthly (respecting filters and from rangeStart)
    const monthlyMatch = { ...match, date: { ...(match.date || {}), $gte: rangeStart } };
    const monthly = await Transaction.aggregate([
      { $match: monthlyMatch },
      {
        $group: {
          _id: { y: { $year: '$date' }, m: { $month: '$date' } },
          income: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
          expense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } },
        },
      },
      { $sort: { '_id.y': 1, '_id.m': 1 } },
    ]);

    // Normalize months sequence
    const monthsArr = [];
    const endMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startMonth = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
    const monthsCount = Math.max(1, Math.min(24, Math.round((endMonth - startMonth) / (1000 * 60 * 60 * 24 * 30)) + 1));
    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(endMonth.getFullYear(), endMonth.getMonth() - i, 1);
      monthsArr.push({ y: d.getFullYear(), m: d.getMonth() + 1 });
    }
    const monthlyMap = new Map(monthly.map(x => [`${x._id.y}-${x._id.m}`, { income: x.income, expense: x.expense }]));
    const monthlySeries = monthsArr.map(({ y, m }) => {
      const key = `${y}-${m}`;
      const val = monthlyMap.get(key) || { income: 0, expense: 0 };
      return { year: y, month: m, label: new Date(y, m - 1, 1).toLocaleString('default', { month: 'short' }), income: val.income, expense: val.expense };
    });

    res.json({ totals: totals || { totalIncome: 0, totalExpense: 0, net: 0 }, monthly: monthlySeries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Transaction not found.' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Transaction not found.' });
    res.status(200).json({ message: 'Transaction deleted.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
