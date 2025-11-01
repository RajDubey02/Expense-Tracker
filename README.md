# Expense Tracker Application

## 📌 Overview
A full-stack expense tracking application that helps users manage their personal finances. The application allows users to track income and expenses, view financial summaries, and perform bulk uploads of transactions.

## 🚀 Features

### Core Features
- **Dashboard**: Overview of financial status with visual charts
- **Transaction Management**: Add, edit, delete transactions with ease
- **Financial Summary**: Detailed breakdown of income vs expenses
- **Responsive Design**: Works seamlessly on all devices

### ✨ Enhanced Features (New!)
- **Bulk Upload** 📤
  - Upload multiple transactions at once using Excel/CSV files
  - Download template for easy data entry
  - Preview data before final submission
  - Automatic validation of file format and required fields
  - Progress tracking during upload

- **Advanced Transaction Table** 📊
  - Sort transactions by any column (click on column headers)
  - Clean, modern UI with hover effects
  - Inline editing with modal form
  - Confirmation dialogs for delete actions
  - Pagination with smart page navigation

- **State Management with Redux**
  - Centralized state management
  - Optimized re-renders for better performance
  - Persistent state across navigation
  - Error handling and loading states

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

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Environment Setup
1. Copy `.env.example` to `.env` in the root directory of backend:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your configuration:
   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb+srv://rajdubey76890_db_user:root123@expensetracker.ulsljwu.mongodb.net/?appName=ExpenseTracker
   
   # Server Port
   PORT=5000
   

   # File Upload Settings
   MAX_FILE_SIZE=5 # in MB
   ALLOWED_FILE_TYPES=.xlsx,.xls,.csv
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
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
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔄 Bulk Upload Guide

### How to Use Bulk Upload
1. **Download Template**
   - Click "Download Template" to get the properly formatted Excel file
   - Fill in your transaction data following the format

2. **File Requirements**
   - Supported formats: .xlsx, .xls, .csv
   - Maximum file size: 5MB
   - Required columns: type, amount, description, category, date

3. **Upload Process**
   - Click "Upload File" and select your file
   - Preview the data before final submission
   - Click "Confirm Upload" to process
   - Track progress with the upload indicator

### File Format Example
```
| type    | amount | description     | category | date       |
|---------|--------|-----------------|----------|------------|
| income  | 50000  | Monthly Salary  | Salary   | 2023-11-01 |
| expense | 1500   | Groceries       | Food     | 2023-11-02 |
| expense | 200    | Mobile Recharge | Bills    | 2023-11-03 |
```

### Validation Rules
- `type`: Must be either 'income' or 'expense'
- `amount`: Must be a positive number
- `description`: Required, max 200 characters
- `category`: Required, will be created if doesn't exist
- `date`: Must be in YYYY-MM-DD format

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
