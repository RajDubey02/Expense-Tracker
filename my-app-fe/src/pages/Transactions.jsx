// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState, useMemo } from 'react';
// import { fetchTransactions, deleteTransaction, updateTransaction } from '../slices/transactionSlice';
// import { toast } from 'react-toastify';
// import Filters from '../components/Filters';

// export default function Transactions() {
//   const { list, loading, error } = useSelector(state => state.transaction);
//   const dispatch = useDispatch();
//   const [editingId, setEditingId] = useState(null);
//   const [edit, setEdit] = useState({ description: '', amount: '', category: '', type: 'expense', date: '' });
//   const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });
//   const [page, setPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => { dispatch(fetchTransactions()); }, [dispatch]);

//   // Reset to first page when list changes or filters applied
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

//   const totalPages = useMemo(() => Math.max(1, Math.ceil(list.length / pageSize)), [list.length]);
//   const paged = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return list.slice(start, start + pageSize);
//   }, [list, page]);

//   return (
//     <div className="max-w-6xl mx-auto ">
//       <div className="flex items-center justify-between mb-2">
//         <h2 className="text-2xl font-bold text-blue-700">Transactions</h2>
//       </div>

//       <Filters value={filters} onApply={handleApply} onChange={setFilters} />

//       {loading ? (
//         <div className="bg-white p-8 rounded shadow text-center">Loading...</div>
//       ) : error ? (
//         <div className="bg-white p-8 rounded shadow text-center text-red-500">{error}</div>
//       ) : list.length === 0 ? (
//         <div className="bg-white p-8 rounded shadow text-center text-gray-400">No transactions found.</div>
//       ) : (
//         <>
//           <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black/5">
//             <table className="min-w-full bg-white text-sm">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="p-4 text-left font-semibold text-gray-700">Description</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Amount</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Category</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Type</th>
//                   <th className="p-4 text-left font-semibold text-gray-700">Date</th>
//                   <th className="p-4"></th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {paged.map((tx) => (
//                   <tr key={tx._id} className="hover:bg-blue-50">
//                     <td className="p-4">
//                       {editingId===tx._id ? (
//                         <input className="border rounded px-2 py-1 w-full" value={edit.description} onChange={e=>setEdit({...edit, description:e.target.value})} />
//                       ) : tx.description}
//                     </td>
//                     <td className="p-4">
//                       {editingId===tx._id ? (
//                         <input className="border rounded px-2 py-1 w-24" value={edit.amount} onChange={e=>setEdit({...edit, amount:e.target.value})} />
//                       ) : (
//                         <span className={`font-bold ${tx.type === "income" ? "text-green-700" : "text-red-700"}`}>₹{tx.amount}</span>
//                       )}
//                     </td>
//                     <td className="p-4">
//                       {editingId===tx._id ? (
//                         <input className="border rounded px-2 py-1" value={edit.category} onChange={e=>setEdit({...edit, category:e.target.value})} />
//                       ) : (
//                         <span className="inline-block bg-gray-200 px-2 py-1 rounded text-xs font-medium text-gray-700">{tx.category}</span>
//                       )}
//                     </td>
//                     <td className="p-4">
//                       {editingId===tx._id ? (
//                         <select className="border rounded px-2 py-1" value={edit.type} onChange={e=>setEdit({...edit, type:e.target.value})}>
//                           <option value="income">income</option>
//                           <option value="expense">expense</option>
//                         </select>
//                       ) : tx.type}
//                     </td>
//                     <td className="p-4">
//                       {editingId===tx._id ? (
//                         <input type="date" className="border rounded px-2 py-1" value={edit.date} onChange={e=>setEdit({...edit, date:e.target.value})} />
//                       ) : (
//                         <span className="text-xs">{new Date(tx.date).toLocaleDateString()}</span>
//                       )}
//                     </td>
//                     <td className="p-4 space-x-2 whitespace-nowrap">
//                       {editingId===tx._id ? (
//                         <>
//                           <button onClick={()=>saveEdit(tx._id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Save</button>
//                           <button onClick={cancelEdit} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded">Cancel</button>
//                         </>
//                       ) : (
//                         <>
//                           <button onClick={()=>startEdit(tx)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Edit</button>
//                           <button onClick={()=>remove(tx._id)} title="Delete" className="text-red-600 hover:bg-red-50 p-2 rounded">
//                             <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
//             <div className="flex gap-2">
//               <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1, p-1))} className={`px-3 py-1 rounded ${page===1?'bg-gray-100 text-gray-300':'bg-white border hover:bg-gray-50'}`}>Prev</button>
//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button key={i} onClick={()=>setPage(i+1)} className={`px-3 py-1 rounded border ${page===i+1?'bg-blue-600 text-white border-blue-600':'bg-white hover:bg-gray-50'}`}>{i+1}</button>
//               ))}
//               <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages, p+1))} className={`px-3 py-1 rounded ${page===totalPages?'bg-gray-100 text-gray-300':'bg-white border hover:bg-gray-50'}`}>Next</button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


















import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { fetchTransactions, deleteTransaction, updateTransaction } from '../slices/transactionSlice';
import { toast } from 'react-toastify';
import { Trash2, Edit2, Save, X } from 'lucide-react';
import Filters from '../components/Filters';

export default function Transactions() {
  const { list, loading, error } = useSelector(state => state.transaction);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [edit, setEdit] = useState({ description: '', amount: '', category: '', type: 'expense', date: '' });
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => { dispatch(fetchTransactions()); }, [dispatch]);

  useEffect(() => { setPage(1); }, [list]);

  const startEdit = (tx) => {
    setEditingId(tx._id);
    setEdit({ description: tx.description, amount: String(tx.amount), category: tx.category, type: tx.type, date: tx.date?.slice(0,10) });
  };
  const cancelEdit = () => { setEditingId(null); };
  const saveEdit = async (id) => {
    if (!edit.description || !edit.category || !edit.date || isNaN(Number(edit.amount)) || Number(edit.amount) <= 0) {
      toast.error('Fill valid values');
      return;
    }
    try {
      await dispatch(updateTransaction({ id, values: { ...edit, amount: Number(edit.amount) } })).unwrap();
      toast.success('Updated');
      setEditingId(null);
    } catch (e) {
      toast.error(e?.message || 'Update failed');
    }
  };
  const remove = async (id) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      toast.success('Deleted');
    } catch (e) {
      toast.error(e?.message || 'Delete failed');
    }
  };

  const handleApply = (f) => {
    setFilters(f);
    dispatch(fetchTransactions(f));
    setPage(1);
  };

  const totalPages = useMemo(() => Math.max(1, Math.ceil(list.length / pageSize)), [list.length]);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }, [list, page]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Transactions</h2>
        <p className="text-gray-500 text-sm mt-1">Manage and track your transactions</p>
      </div>

      <Filters value={filters} onApply={handleApply} onChange={setFilters} />

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">Loading...</div>
      ) : error ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-red-500">{error}</div>
      ) : list.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-400">No transactions found.</div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-16">Sr No</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paged.map((tx, index) => (
                    <tr key={tx._id} className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 text-gray-500 font-medium">
                        {(page - 1) * pageSize + index + 1}
                      </td>
                      <td className="py-4 px-6">
                        {editingId === tx._id ? (
                          <input 
                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={edit.description} 
                            onChange={e => setEdit({...edit, description: e.target.value})} 
                          />
                        ) : (
                          <span className="text-gray-800 font-medium">{tx.description}</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {editingId === tx._id ? (
                          <input 
                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={edit.category} 
                            onChange={e => setEdit({...edit, category: e.target.value})} 
                          />
                        ) : (
                          <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium border border-blue-200">
                            {tx.category}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {editingId === tx._id ? (
                          <input 
                            type="date" 
                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={edit.date} 
                            onChange={e => setEdit({...edit, date: e.target.value})} 
                          />
                        ) : (
                          <span className="text-gray-600 text-sm">
                            {new Date(tx.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {editingId === tx._id ? (
                          <select 
                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={edit.type} 
                            onChange={e => setEdit({...edit, type: e.target.value})}
                          >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold ${
                            tx.type === 'income' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {tx.type === 'income' ? '↑ Income' : '↓ Expense'}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {editingId === tx._id ? (
                          <input 
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={edit.amount} 
                            onChange={e => setEdit({...edit, amount: e.target.value})} 
                          />
                        ) : (
                          <span className={`font-bold text-lg ${
                            tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          {editingId === tx._id ? (
                            <>
                              <button
                                onClick={() => saveEdit(tx._id)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-all"
                                title="Save"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(tx)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => remove(tx._id)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 bg-white px-6 py-4 rounded-lg shadow">
            <div className="text-sm text-gray-600 font-medium">
              Page {page} of {totalPages} • Showing {paged.length} of {list.length} transactions
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
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
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
    </div>
  );
}