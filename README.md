# Expense Tracker Application

## 📌 Overview
A full-stack expense tracking application that helps users manage their personal finances. The application allows users to track income and expenses, view financial summaries, and perform bulk uploads of transactions.

## 🚀 Features

### Frontend (React)
- **Dashboard**: Overview of financial status
- **Transaction Management**: Add, edit, delete transactions
- **Bulk Upload**: Upload multiple transactions via Excel/CSV
- **Financial Summary**: Visual representation of expenses/income
- **State Management with Redux**:
  - Centralized state management for transactions data
  - Efficient data flow between components
  - Predictable state updates
  - Handles all CRUD operations
  - Manages loading and error states
- **Responsive Design**: Works on all devices

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: For all CRUD operations
- **File Processing**: Handle Excel/CSV uploads
- **Database**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- **React** - UI Library
- **Redux** - State Management (managing transactions state globally)
  - Redux Toolkit for simplified state management
  - React-Redux for React integration
  - Redux DevTools for debugging
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **XLSX (SheetJS)** - Excel file handling
- **React Icons (Lucide)** - Icons
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File Uploads
- **XLSX (SheetJS)** - Excel parsing

## 📂 Project Structure

### Frontend (`/my-app-fe`)
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API services
├── slices/        # Redux slices
├── App.jsx        # Main App component
└── index.js       # Entry point
```

### Backend (`/Backend`)
```
Backend/
├── config/        # Configuration files
│   └── multer.js  # File upload config
├── controllers/   # Route controllers
├── models/        # Database models
├── routes/        # API routes
└── server.js      # Server entry point
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd my-app-fe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔄 Bulk Upload Feature

### How It Works
1. **File Upload**: Users can upload Excel/CSV files
2. **Validation**: File is validated for format and required fields
3. **Preview**: Users can review data before submission
4. **Processing**: Backend processes and saves transactions
5. **Feedback**: Success/error messages are displayed

### Required File Format
```
| type  | amount | description | category | date       |
|-------|--------|-------------|----------|------------|
| income| 1000   | Salary      | Salary   | 2023-01-01 |
| expense| 50    | Groceries   | Food     | 2023-01-02 |
```

## 📝 API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Add new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `POST /api/transactions/bulk-upload` - Bulk upload transactions

### Summary
- `GET /api/transactions/summary` - Get financial summary

## 🔄 State Management

### Redux Implementation
- **Store**: Centralized state container
- **Slices**: 
  - `transactionSlice.js`: Handles all transaction-related state
  - Manages loading states, errors, and transaction data
- **Actions**:
  - `addTransaction`
  - `updateTransaction`
  - `deleteTransaction`
  - `fetchTransactions`
  - `uploadBulkTransactions`
- **Selectors**:
  - `selectTransactions`
  - `selectTransactionById`
  - `selectTransactionsByFilter`

### Benefits
- **Single Source of Truth**: All transaction data is managed in one place
- **Predictable State Updates**: State changes are handled through pure functions (reducers)
- **Efficient Rerenders**: Components only update when their specific data changes
- **Debugging**: Easy to track state changes with Redux DevTools

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **File Upload Issues**
   - Check file size (max 5MB)
   - Ensure correct file format (.xlsx, .xls, .csv)
   - Verify required columns in the file

## 📄 License
This project is licensed under the MIT License.



---

Made with ❤️ by [Rajnish Dubey]
