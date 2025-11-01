







// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState, useMemo } from 'react';
// import { fetchTransactions, deleteTransaction, updateTransaction } from '../slices/transactionSlice';
// import { toast } from 'react-toastify';
// import { Trash2, Edit2, Save, X } from 'lucide-react';
// import Filters from '../components/Filters';

// export default function Transactions() {
//   const { list: rawList, loading, error } = useSelector(state => state.transaction);
//   const list = Array.isArray(rawList) ? rawList : [];
//   const dispatch = useDispatch();
//   const [editingId, setEditingId] = useState(null);
//   const [edit, setEdit] = useState({ description: '', amount: '', category: '', type: 'expense', date: '' });
//   const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });
//   const [page, setPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => { dispatch(fetchTransactions()); }, [dispatch]);

//   useEffect(() => { setPage(1); }, [list]);

//   const startEdit = (tx) => {
//     setEditingId(tx._id);
//     setEdit({ description: tx.description, amount: String(tx.amount), category: tx.category, type: tx.type, date: tx.date?.slice(0,10) });
//   };
//   const cancelEdit = () => { setEditingId(null); };
//   const saveEdit = async (id) => {
//     if (!edit.description || !edit.category || !edit.date || isNaN(Number(edit.amount)) || Number(edit.amount) <= 0) {
//       toast.error('Fill valid values');
//       return;
//     }
//     try {
//       await dispatch(updateTransaction({ id, values: { ...edit, amount: Number(edit.amount) } })).unwrap();
//       toast.success('Updated');
//       setEditingId(null);
//     } catch (e) {
//       toast.error(e?.message || 'Update failed');
//     }
//   };
//   const remove = async (id) => {
//     try {
//       await dispatch(deleteTransaction(id)).unwrap();
//       toast.success('Deleted');
//     } catch (e) {
//       toast.error(e?.message || 'Delete failed');
//     }
//   };

//   const handleApply = (f) => {
//     setFilters(f);
//     dispatch(fetchTransactions(f));
//     setPage(1);
//   };

//   const totalPages = useMemo(() => {
//     if (!Array.isArray(list)) return 1;
//     return Math.max(1, Math.ceil(list.length / pageSize));
//   }, [list]);

//   const paged = useMemo(() => {
//     if (!Array.isArray(list)) return [];
//     const start = (page - 1) * pageSize;
//     return list.slice(start, start + pageSize);
//   }, [list, page]);

//   return (
//     <div className="max-w-[90vw] mx-auto">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">All Transactions</h2>
//         <p className="text-gray-500 text-sm mt-1">Manage and track your transactions</p>
//       </div>

//       <Filters value={filters} onApply={handleApply} onChange={setFilters} />

//       {loading ? (
//         <div className="bg-white p-8 rounded-lg shadow text-center">Loading...</div>
//       ) : error ? (
//         <div className="bg-white p-8 rounded-lg shadow text-center text-red-500">{error}</div>
//       ) : list.length === 0 ? (
//         <div className="bg-white p-8 rounded-lg shadow text-center text-gray-400">No transactions found.</div>
//       ) : (
//         <>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50 border-b border-gray-200">
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-16">Sr No</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
//                     <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
//                     <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-32">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {paged.map((tx, index) => (
//                     <tr key={tx._id} className="hover:bg-blue-50 transition-colors">
//                       <td className="py-4 px-6 text-gray-500 font-medium">
//                         {(page - 1) * pageSize + index + 1}
//                       </td>
//                       <td className="py-4 px-6">
//                         {editingId === tx._id ? (
//                           <input 
//                             className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                             value={edit.description} 
//                             onChange={e => setEdit({...edit, description: e.target.value})} 
//                           />
//                         ) : (
//                           <span className="text-gray-800 font-medium">{tx.description}</span>
//                         )}
//                       </td>
//                       <td className="py-4 px-6">
//                         {editingId === tx._id ? (
//                           <input 
//                             className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                             value={edit.category} 
//                             onChange={e => setEdit({...edit, category: e.target.value})} 
//                           />
//                         ) : (
//                           <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium border border-blue-200">
//                             {tx.category}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-4 px-6">
//                         {editingId === tx._id ? (
//                           <input 
//                             type="date" 
//                             className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                             value={edit.date} 
//                             onChange={e => setEdit({...edit, date: e.target.value})} 
//                           />
//                         ) : (
//                           <span className="text-gray-600 text-sm">
//                             {new Date(tx.date).toLocaleDateString('en-IN', { 
//                               day: 'numeric', 
//                               month: 'short', 
//                               year: 'numeric' 
//                             })}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-4 px-6">
//                         {editingId === tx._id ? (
//                           <select 
//                             className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                             value={edit.type} 
//                             onChange={e => setEdit({...edit, type: e.target.value})}
//                           >
//                             <option value="income">Income</option>
//                             <option value="expense">Expense</option>
//                           </select>
//                         ) : (
//                           <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold ${
//                             tx.type === 'income' 
//                               ? 'bg-green-100 text-green-700' 
//                               : 'bg-red-100 text-red-700'
//                           }`}>
//                             {tx.type === 'income' ? '↑ Income' : '↓ Expense'}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-4 px-6 text-right">
//                         {editingId === tx._id ? (
//                           <input 
//                             className="w-full px-3 py-1.5 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                             value={edit.amount} 
//                             onChange={e => setEdit({...edit, amount: e.target.value})} 
//                           />
//                         ) : (
//                           <span className={`font-bold text-lg ${
//                             tx.type === 'income' ? 'text-green-600' : 'text-red-600'
//                           }`}>
//                             {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-4 px-6">
//                         <div className="flex items-center justify-center gap-2">
//                           {editingId === tx._id ? (
//                             <>
//                               <button
//                                 onClick={() => saveEdit(tx._id)}
//                                 className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-all"
//                                 title="Save"
//                               >
//                                 <Save className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={cancelEdit}
//                                 className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
//                                 title="Cancel"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               <button
//                                 onClick={() => startEdit(tx)}
//                                 className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
//                                 title="Edit"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => remove(tx._id)}
//                                 className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-all"
//                                 title="Delete"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-6 bg-white px-6 py-4 rounded-lg shadow">
//             <div className="text-sm text-gray-600 font-medium">
//               Page {page} of {totalPages} • Showing {paged.length} of {list.length} transactions
//             </div>
//             <div className="flex gap-2">
//               <button 
//                 disabled={page === 1} 
//                 onClick={() => setPage(p => Math.max(1, p - 1))} 
//                 className={`px-4 py-2 rounded-lg font-medium transition ${
//                   page === 1 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 Previous
//               </button>
//               {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (page <= 3) {
//                   pageNum = i + 1;
//                 } else if (page >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = page - 2 + i;
//                 }
//                 return (
//                   <button 
//                     key={i} 
//                     onClick={() => setPage(pageNum)} 
//                     className={`px-4 py-2 rounded-lg font-medium transition ${
//                       page === pageNum 
//                         ? 'bg-blue-600 text-white' 
//                         : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//               <button 
//                 disabled={page === totalPages} 
//                 onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
//                 className={`px-4 py-2 rounded-lg font-medium transition ${
//                   page === totalPages 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



















// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState, useMemo } from 'react';
// import { fetchTransactions, deleteTransaction, updateTransaction } from '../slices/transactionSlice';
// import { toast } from 'react-toastify';
// import { Trash2, Edit2 } from 'lucide-react';
// import Filters from '../components/Filters';

// export default function Transactions() {
//   const { list: rawList, loading, error } = useSelector(state => state.transaction);
//   const list = Array.isArray(rawList) ? rawList : [];
//   const dispatch = useDispatch();

//   // Edit Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTx, setEditingTx] = useState(null);
//   const [edit, setEdit] = useState({ description: '', amount: '', category: '', type: 'expense', date: '' });

//   const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });
//   const [page, setPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => { dispatch(fetchTransactions()); }, [dispatch]);
//   useEffect(() => { setPage(1); }, [list]);

//   // Open Modal
//   const startEdit = (tx) => {
//     setEditingTx(tx);
//     setEdit({
//       description: tx.description,
//       amount: String(tx.amount),
//       category: tx.category,
//       type: tx.type,
//       date: tx.date?.slice(0, 10) || ''
//     });
//     setIsModalOpen(true);
//   };

//   // Close Modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingTx(null);
//     setEdit({ description: '', amount: '', category: '', type: 'expense', date: '' });
//   };

//   // Save Edit
//   const saveEdit = async () => {
//     if (!edit.description || !edit.category || !edit.date || isNaN(Number(edit.amount)) || Number(edit.amount) <= 0) {
//       toast.error('Fill valid values');
//       return;
//     }
//     try {
//       await dispatch(updateTransaction({
//         id: editingTx._id,
//         values: { ...edit, amount: Number(edit.amount) }
//       })).unwrap();
//       toast.success('Updated');
//       closeModal();
//     } catch (e) {
//       toast.error(e?.message || 'Update failed');
//     }
//   };

//   const remove = async (id) => {
//     try {
//       await dispatch(deleteTransaction(id)).unwrap();
//       toast.success('Deleted');
//     } catch (e) {
//       toast.error(e?.message || 'Delete failed');
//     }
//   };

//   const handleApply = (f) => {
//     setFilters(f);
//     dispatch(fetchTransactions(f));
//     setPage(1);
//   };

//   const totalPages = useMemo(() => {
//     return Math.max(1, Math.ceil(list.length / pageSize));
//   }, [list]);

//   const paged = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return list.slice(start, start + pageSize);
//   }, [list, page]);

//   return (
//     <div className="max-w-[90vw] mx-auto">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">All Transactions</h2>
//         <p className="text-gray-500 text-sm mt-1">Manage and track your transactions</p>
//       </div>

//       <Filters value={filters} onApply={handleApply} onChange={setFilters} />

//       {loading ? (
//         <div className="bg-white p-8 rounded-lg shadow text-center">Loading...</div>
//       ) : error ? (
//         <div className="bg-white p-8 rounded-lg shadow text-center text-red-500">{error}</div>
//       ) : list.length === 0 ? (
//         <div className="bg-white p-8 rounded-lg shadow text-center text-gray-400">No transactions found.</div>
//       ) : (
//         <>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50 border-b border-gray-200">
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-16">Sr No</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
//                     <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
//                     <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
//                     <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-32">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {paged.map((tx, index) => (
//                     <tr key={tx._id} className="hover:bg-blue-50 transition-colors">
//                       <td className="py-4 px-6 text-gray-500 font-medium">
//                         {(page - 1) * pageSize + index + 1}
//                       </td>
//                       <td className="py-4 px-6">
//                         <span className="text-gray-800 font-medium">{tx.description}</span>
//                       </td>
//                       <td className="py-4 px-6">
//                         <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium border border-blue-200">
//                           {tx.category}
//                         </span>
//                       </td>
//                       <td className="py-4 px-6">
//                         <span className="text-gray-600 text-sm">
//                           {new Date(tx.date).toLocaleDateString('en-IN', { 
//                             day: 'numeric', 
//                             month: 'short', 
//                             year: 'numeric' 
//                           })}
//                         </span>
//                       </td>
//                       <td className="py-4 px-6">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold ${
//                           tx.type === 'income' 
//                             ? 'bg-green-100 text-green-700' 
//                             : 'bg-red-100 text-red-700'
//                         }`}>
//                           {tx.type === 'income' ? '↑ Income' : '↓ Expense'}
//                         </span>
//                       </td>
//                       <td className="py-4 px-6 text-right">
//                         <span className={`font-bold text-lg ${
//                           tx.type === 'income' ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
//                         </span>
//                       </td>
//                       <td className="py-4 px-6">
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() => startEdit(tx)}
//                             className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
//                             title="Edit"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => remove(tx._id)}
//                             className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-all"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between mt-6 bg-white px-6 py-4 rounded-lg shadow">
//             <div className="text-sm text-gray-600 font-medium">
//               Page {page} of {totalPages} • Showing {paged.length} of {list.length} transactions
//             </div>
//             <div className="flex gap-2">
//               <button 
//                 disabled={page === 1} 
//                 onClick={() => setPage(p => Math.max(1, p - 1))} 
//                 className={`px-4 py-2 rounded-lg font-medium transition ${
//                   page === 1 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 Previous
//               </button>
//               {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) pageNum = i + 1;
//                 else if (page <= 3) pageNum = i + 1;
//                 else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
//                 else pageNum = page - 2 + i;

//                 return (
//                   <button 
//                     key={i} 
//                     onClick={() => setPage(pageNum)} 
//                     className={`px-4 py-2 rounded-lg font-medium transition ${
//                       page === pageNum 
//                         ? 'bg-blue-600 text-white' 
//                         : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//               <button 
//                 disabled={page === totalPages} 
//                 onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
//                 className={`px-4 py-2 rounded-lg font-medium transition ${
//                   page === totalPages 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Transaction</h3>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <input 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                   value={edit.description} 
//                   onChange={e => setEdit({...edit, description: e.target.value})} 
//                   placeholder="e.g. Grocery shopping"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <input 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                   value={edit.category} 
//                   onChange={e => setEdit({...edit, category: e.target.value})} 
//                   placeholder="e.g. Food"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                 <input 
//                   type="date" 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                   value={edit.date} 
//                   onChange={e => setEdit({...edit, date: e.target.value})} 
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                 <select 
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                   value={edit.type} 
//                   onChange={e => setEdit({...edit, type: e.target.value})}
//                 >
//                   <option value="income">Income</option>
//                   <option value="expense">Expense</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                 <input 
//                   type="number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                   value={edit.amount} 
//                   onChange={e => setEdit({...edit, amount: e.target.value})} 
//                   placeholder="0.00"
//                   min="0"
//                   step="0.01"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveEdit}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


















import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { fetchTransactions, deleteTransaction, updateTransaction } from '../slices/transactionSlice';
import { toast } from 'react-toastify';
import { Trash2, Edit2, ChevronUp, ChevronDown, X } from 'lucide-react';
import Filters from '../components/Filters';

export default function Transactions() {
  const { list: rawList, loading, error } = useSelector(state => state.transaction);
  const list = Array.isArray(rawList) ? rawList : [];
  const dispatch = useDispatch();

  // Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [edit, setEdit] = useState({ description: '', amount: '', category: '', type: 'expense', date: '' });

  // Filters & Pagination
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  useEffect(() => { dispatch(fetchTransactions()); }, [dispatch]);
  useEffect(() => { setPage(1); }, [list]);

  // Sorting Logic
  const sortedList = useMemo(() => {
    const sortableList = [...list];
    if (!sortConfig.key) return sortableList;

    return sortableList.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (sortConfig.key === 'amount') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [list, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  // Modal Functions
  const startEdit = (tx) => {
    setEditingTx(tx);
    setEdit({
      description: tx.description,
      amount: String(tx.amount),
      category: tx.category,
      type: tx.type,
      date: tx.date?.slice(0, 10) || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTx(null);
    setEdit({ description: '', amount: '', category: '', type: 'expense', date: '' });
  };

  const saveEdit = async () => {
    if (!edit.description || !edit.category || !edit.date || isNaN(Number(edit.amount)) || Number(edit.amount) <= 0) {
      toast.error('Please fill all fields with valid values');
      return;
    }
    try {
      await dispatch(updateTransaction({
        id: editingTx._id,
        values: { ...edit, amount: Number(edit.amount) }
      })).unwrap();
      toast.success('Transaction updated successfully');
      closeModal();
    } catch (e) {
      toast.error(e?.message || 'Failed to update');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      toast.success('Deleted successfully');
    } catch (e) {
      toast.error(e?.message || 'Delete failed');
    }
  };

  const handleApply = (f) => {
    setFilters(f);
    dispatch(fetchTransactions(f));
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(sortedList.length / pageSize));
  const paged = sortedList.slice((page - 1) * pageSize, page * pageSize);

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeModal(); };
    if (isModalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  return (
    <div className="max-w-[95vw] mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">All Transactions</h2>
        <p className="text-gray-500 text-sm mt-1">Click column headers to sort</p>
      </div>

      <Filters value={filters} onApply={handleApply} onChange={setFilters} />

      {loading ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center text-gray-500">Loading transactions...</div>
      ) : error ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center text-red-500">{error}</div>
      ) : list.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center text-gray-400">No transactions found.</div>
      ) : (
        <>
          {/* Enhanced Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-16 cursor-default">
                      Sr No
                    </th>
                    <th
                      onClick={() => requestSort('description')}
                      className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center gap-1">
                        Description {getSortIcon('description')}
                      </div>
                    </th>
                    <th
                      onClick={() => requestSort('category')}
                      className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center gap-1">
                        Category {getSortIcon('category')}
                      </div>
                    </th>
                    <th
                      onClick={() => requestSort('date')}
                      className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center gap-1">
                        Date {getSortIcon('date')}
                      </div>
                    </th>
                    <th
                      onClick={() => requestSort('type')}
                      className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center gap-1">
                        Type {getSortIcon('type')}
                      </div>
                    </th>
                    <th
                      onClick={() => requestSort('amount')}
                      className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition"
                    >
                      <div className="flex items-center justify-end gap-1">
                        Amount {getSortIcon('amount')}
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paged.map((tx, index) => (
                    <tr
                      key={tx._id}
                      className="hover:bg-blue-50/50 transition-all duration-150 group"
                    >
                      <td className="py-4 px-6 text-gray-500 font-medium text-sm">
                        {(page - 1) * pageSize + index + 1}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-800 font-medium">{tx.description}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600 text-sm font-medium">
                          {new Date(tx.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          tx.type === 'income'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {tx.type === 'income' ? 'Income' : 'Expense'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`font-bold text-lg ${
                          tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEdit(tx)}
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => remove(tx._id)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 font-medium mb-3 sm:mb-0">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong> • Showing <strong>{paged.length}</strong> of <strong>{sortedList.length}</strong> transactions
            </div>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  page === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (page <= 3) pageNum = i + 1;
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = page - 2 + i;

                return (
                  <button
                    key={i}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  page === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Premium Blur Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          {/* Blur Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal Card */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-6 border border-white/20 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-800">Edit Transaction</h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={edit.description}
                  onChange={e => setEdit({ ...edit, description: e.target.value })}
                  placeholder="e.g. Grocery shopping"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={edit.category}
                  onChange={e => setEdit({ ...edit, category: e.target.value })}
                  placeholder="e.g. Food"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={edit.date}
                  onChange={e => setEdit({ ...edit, date: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={edit.type}
                  onChange={e => setEdit({ ...edit, type: e.target.value })}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={edit.amount}
                  onChange={e => setEdit({ ...edit, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition font-medium shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}