require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/transactions', require('./routes/transactionRoutes'));

// Error handler 404/fallback
app.use((req, res) => {
  res.status(404).json({ message: 'API Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
