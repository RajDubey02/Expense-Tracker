// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addTransaction } from '../slices/transactionSlice';
// import { toast } from 'react-toastify';

// const initialState = { type: 'expense', amount: '', description: '', category: '', date: '' };

// export default function TransactionForm() {
//   const [form, setForm] = useState(initialState);
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (!form.amount || !form.description || !form.category || !form.date) {
//       setError('All fields required.');
//       return;
//     }
//     if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
//       setError('Amount must be positive number.');
//       return;
//     }
//     try {
//       await dispatch(addTransaction({ ...form, amount: Number(form.amount) })).unwrap();
//       toast.success('Transaction added');
//       setForm(initialState);
//       setError('');
//     } catch (err) {
//       toast.error(err?.message || 'Failed to add');
//     }
//   };

//   return (
//     <form className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-blue-100" onSubmit={handleSubmit}>
//       <div className="text-lg font-semibold text-blue-700 mb-2">Add Transaction</div>
//       {error && <div className="text-sm text-white bg-red-400 rounded px-3 py-1">{error}</div>}
//       <div className="flex gap-4">
//         <div className="flex flex-col flex-1">
//           <label className="font-medium mb-1">Type</label>
//           <select className="input-field" name="type" value={form.type} onChange={handleChange}>
//             <option value="income">Income</option>
//             <option value="expense">Expense</option>
//           </select>
//         </div>
//         <div className="flex flex-col flex-1">
//           <label className="font-medium mb-1">Amount (₹)</label>
//           <input className="input-field" name="amount" value={form.amount} onChange={handleChange} />
//         </div>
//       </div>
//       <div className="flex gap-4">
//         <div className="flex flex-col flex-1">
//           <label className="font-medium mb-1">Description</label>
//           <input className="input-field" name="description" value={form.description} onChange={handleChange} />
//         </div>
//         <div className="flex flex-col flex-1">
//           <label className="font-medium mb-1">Category</label>
//           <input className="input-field" name="category" value={form.category} onChange={handleChange} />
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <label className="font-medium mb-1">Date</label>
//         <input className="input-field" type="date" name="date" value={form.date} onChange={handleChange} />
//       </div>
//       <button className="bg-blue-600 hover:bg-blue-700 transition text-white text-base font-semibold py-2 mt-2 rounded-lg shadow">Add Transaction</button>
//       <style jsx>{`
//         .input-field {
//           @apply border border-gray-300 rounded-md px-3 py-2 focus:border-blue-400 shadow-sm transition outline-none text-base;
//         }
//       `}</style>
//     </form>
//   );
// }

























import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../slices/transactionSlice';
import { toast } from 'react-toastify';

const initialState = { type: 'expense', amount: '', description: '', category: '', date: '' };

export default function TransactionForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.category || !form.date) {
      setError('All fields required.');
      return;
    }
    if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError('Amount must be positive number.');
      return;
    }
    try {
      await dispatch(addTransaction({ ...form, amount: Number(form.amount) })).unwrap();
      toast.success('Transaction added');
      setForm(initialState);
      setError('');
    } catch (err) {
      toast.error(err?.message || 'Failed to add');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Add New Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (₹)</label>
            <input 
              type="text"
              name="amount" 
              value={form.amount} 
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <input 
            type="text"
            name="description" 
            value={form.description} 
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <input 
              type="text"
              name="category" 
              value={form.category} 
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
            <input 
              type="date"
              name="date" 
              value={form.date} 
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded transition mt-2"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}