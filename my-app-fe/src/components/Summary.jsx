// import { useSelector } from 'react-redux';

// export default function Summary() {
//   const { list } = useSelector((state) => state.transaction);
//   const income = list.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
//   const expense = list.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);

//   return (
//     <div className="flex gap-6 mb-6 flex-wrap justify-center">
//       <div className="flex-1 min-w-[180px] bg-white border border-green-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
//         <div className="p-2 bg-green-100 rounded-full">
//           <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#bbf7d0"/><path d="M7 12v1a5 5 0 0010 0v-1" stroke="#16a34a" strokeWidth="2"/><path d="M12 7v5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="1.5" fill="#16a34a"/></svg>
//         </div>
//         <div>
//           <div className="text-xs uppercase text-green-600 font-semibold tracking-wider">Income</div>
//           <div className="text-3xl font-extrabold text-green-700">₹{income}</div>
//         </div>
//       </div>
//       <div className="flex-1 min-w-[180px] bg-white border border-red-200 rounded-xl shadow-sm p-6 flex items-center gap-4">
//         <div className="p-2 bg-red-100 rounded-full">
//           <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fee2e2"/><path d="M7 13v-1a5 5 0 0110 0v1" stroke="#dc2626" strokeWidth="2"/><path d="M12 17v-5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1.5" fill="#dc2626"/></svg>
//         </div>
//         <div>
//           <div className="text-xs uppercase text-red-600 font-semibold tracking-wider">Expense</div>
//           <div className="text-3xl font-extrabold text-red-700">₹{expense}</div>
//         </div>
//       </div>
//     </div>
//   );
// }














import { useSelector } from 'react-redux';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function Summary() {
  const { list } = useSelector((state) => state.transaction);
  
  // Ensure list is an array before filtering
  const transactions = Array.isArray(list) ? list : [];
  
  const income = transactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const expense = transactions.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">Total Income</p>
            <p className="text-3xl font-bold text-green-800">₹{income.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-green-200 p-4 rounded-full">
            <TrendingUp className="w-8 h-8 text-green-700" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-2">Total Expense</p>
            <p className="text-3xl font-bold text-red-800">₹{expense.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-red-200 p-4 rounded-full">
            <TrendingDown className="w-8 h-8 text-red-700" />
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${
        balance >= 0 
          ? 'from-blue-50 to-blue-100 border-blue-200' 
          : 'from-orange-50 to-orange-100 border-orange-200'
      } border rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-wide mb-2 ${
              balance >= 0 ? 'text-blue-700' : 'text-orange-700'
            }`}>
              Net Balance
            </p>
            <p className={`text-3xl font-bold ${
              balance >= 0 ? 'text-blue-800' : 'text-orange-800'
            }`}>
              ₹{balance.toLocaleString('en-IN')}
            </p>
          </div>
          <div className={`${
            balance >= 0 ? 'bg-blue-200' : 'bg-orange-200'
          } p-4 rounded-full`}>
            <DollarSign className={`w-8 h-8 ${
              balance >= 0 ? 'text-blue-700' : 'text-orange-700'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
}