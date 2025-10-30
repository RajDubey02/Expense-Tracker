const Transaction = require('../models/Transaction');

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
