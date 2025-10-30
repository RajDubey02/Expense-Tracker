import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../slices/transactionSlice';

export default function TransactionList() {
  const { list, loading, error } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  if (loading) return <div className="bg-white shadow rounded-xl p-4">Loading...</div>;
  if (error) return <div className="bg-white shadow rounded-xl p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="text-lg font-semibold text-blue-700 mb-2">Transactions</div>
      <ul className="divide-y divide-gray-100">
        {list.length === 0 && <li className="py-8 text-center text-gray-400">No transactions found.</li>}
        {list.map((tx, i) => (
          <li
            key={tx._id}
            className={`flex flex-col md:flex-row md:items-center justify-between gap-2 py-3 px-2 ${i % 2 === 0 ? 'bg-gray-50' : ''}`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
              <span className="font-medium text-gray-800">{tx.description}</span>
              <span className="inline-block bg-gray-200 rounded px-2 py-0.5 text-xs text-gray-600">{tx.category}</span>
              <span className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString()}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full font-bold ${tx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              ₹{tx.amount}
            </span>
            <button title="Delete" className="ml-1 p-1 rounded hover:bg-red-100 transition flex items-center" onClick={() => dispatch(deleteTransaction(tx._id))}>
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
