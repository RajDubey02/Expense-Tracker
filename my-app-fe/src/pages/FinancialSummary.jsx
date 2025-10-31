// import { useEffect, useState } from 'react';
// import Filters from '../components/Filters';
// import { getSummary } from '../services/transactions';

// export default function FinancialSummary() {
//   const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });
//   const [months, setMonths] = useState(6);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [rows, setRows] = useState([]);
//   const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, net: 0 });

//   const load = async (m, f) => {
//     try {
//       setLoading(true);
//       const res = await getSummary({ months: m, ...f });
//       setRows(res.monthly);
//       setTotals(res.totals);
//       setError('');
//     } catch (e) {
//       setError('Failed to load summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { load(months, filters); }, [months, filters]);

//   const applyFilters = (f) => setFilters(f);

//   const totalRow = {
//     label: 'Total',
//     income: rows.reduce((a, b) => a + b.income, 0),
//     expense: rows.reduce((a, b) => a + b.expense, 0),
//   };
//   totalRow.net = totalRow.income - totalRow.expense;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-blue-700">Financial Summary</h2>
//         <div className="flex gap-2">
//           <button onClick={() => setMonths(3)} className={`px-3 py-1 rounded text-sm ${months===3?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'}`}>3 mo</button>
//           <button onClick={() => setMonths(6)} className={`px-3 py-1 rounded text-sm ${months===6?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'}`}>6 mo</button>
//           <button onClick={() => setMonths(12)} className={`px-3 py-1 rounded text-sm ${months===12?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'}`}>12 mo</button>
//         </div>
//       </div>

//       <Filters value={filters} onApply={applyFilters} onChange={setFilters} />

//       <div className="bg-white rounded-lg shadow ring-1 ring-black/5 overflow-hidden">
//         {loading ? (
//           <div className="p-8 text-center">Loading...</div>
//         ) : error ? (
//           <div className="p-8 text-center text-red-600">{error}</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="p-3 text-left font-semibold text-gray-700">Month</th>
//                   <th className="p-3 text-left font-semibold text-gray-700">Income</th>
//                   <th className="p-3 text-left font-semibold text-gray-700">Expense</th>
//                   <th className="p-3 text-left font-semibold text-gray-700">Net</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {rows.map((r) => (
//                   <tr key={`${r.year}-${r.month}`} className="hover:bg-blue-50">
//                     <td className="p-3">{r.label} {r.year}</td>
//                     <td className="p-3 text-green-700 font-semibold">₹{r.income}</td>
//                     <td className="p-3 text-red-700 font-semibold">₹{r.expense}</td>
//                     <td className={`p-3 font-bold ${r.income - r.expense >= 0 ? 'text-emerald-700':'text-rose-700'}`}>₹{r.income - r.expense}</td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot className="bg-gray-50">
//                 <tr>
//                   <td className="p-3 font-semibold">Total</td>
//                   <td className="p-3 text-green-700 font-bold">₹{totalRow.income}</td>
//                   <td className="p-3 text-red-700 font-bold">₹{totalRow.expense}</td>
//                   <td className={`p-3 font-extrabold ${totalRow.net >= 0 ? 'text-emerald-700':'text-rose-700'}`}>₹{totalRow.net}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         )}
//       </div>

//       <div className="mt-4 text-xs text-gray-500">Totals (all time): Income ₹{totals.totalIncome} • Expense ₹{totals.totalExpense} • Net ₹{totals.net}</div>
//     </div>
//   );
// }


























import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import Filters from '../components/Filters';
import { getSummary } from '../services/transactions';

export default function FinancialSummary() {
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });
  const [months, setMonths] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, net: 0 });

  const load = async (m, f) => {
    try {
      setLoading(true);
      const res = await getSummary({ months: m, ...f });
      setRows(Array.isArray(res?.monthly) ? res.monthly : []);
      setTotals(res?.totals || { totalIncome: 0, totalExpense: 0, net: 0 });
      setError('');
    } catch (e) {
      setError('Failed to load summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(months, filters); }, [months, filters]);

  const applyFilters = (f) => setFilters(f);

  const safeRows = Array.isArray(rows) ? rows : [];
  const totalRow = {
    label: 'Total',
    income: safeRows.reduce((a, b) => a + b.income, 0),
    expense: safeRows.reduce((a, b) => a + b.expense, 0),
  };
  totalRow.net = totalRow.income - totalRow.expense;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Summary</h2>
          <p className="text-gray-500 text-sm mt-1">Monthly breakdown of your finances</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setMonths(3)} 
            className={`px-4 py-2 rounded-lg font-medium transition ${
              months === 3 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            3 Months
          </button>
          <button 
            onClick={() => setMonths(6)} 
            className={`px-4 py-2 rounded-lg font-medium transition ${
              months === 6 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            6 Months
          </button>
          <button 
            onClick={() => setMonths(12)} 
            className={`px-4 py-2 rounded-lg font-medium transition ${
              months === 12 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            12 Months
          </button>
        </div>
      </div>

      <Filters value={filters} onApply={applyFilters} onChange={setFilters} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-800">₹{totals.totalIncome.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-green-200 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700 mb-1">Total Expense</p>
              <p className="text-2xl font-bold text-red-800">₹{totals.totalExpense.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-red-200 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${
          totals.net >= 0 
            ? 'from-blue-50 to-blue-100 border-blue-200' 
            : 'from-orange-50 to-orange-100 border-orange-200'
        } border rounded-lg p-5 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${
                totals.net >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}>
                Net Balance
              </p>
              <p className={`text-2xl font-bold ${
                totals.net >= 0 ? 'text-blue-800' : 'text-orange-800'
              }`}>
                ₹{totals.net.toLocaleString('en-IN')}
              </p>
            </div>
            <div className={`${
              totals.net >= 0 ? 'bg-blue-200' : 'bg-orange-200'
            } p-3 rounded-lg`}>
              <DollarSign className={`w-6 h-6 ${
                totals.net >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Month
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Income
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Expense
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Net
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((r) => {
                  const net = r.income - r.expense;
                  return (
                    <tr key={`${r.year}-${r.month}`} className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-800">
                        {r.label} {r.year}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-green-600 font-semibold">
                          +₹{r.income.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-red-600 font-semibold">
                          -₹{r.expense.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-bold text-lg ${
                          net >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {net >= 0 ? '+' : ''}₹{net.toLocaleString('en-IN')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 border-t-2 border-gray-300">
                  <td className="py-4 px-6 font-bold text-gray-800 text-lg">Total</td>
                  <td className="py-4 px-6">
                    <span className="text-green-700 font-bold text-lg">
                      +₹{totalRow.income.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-red-700 font-bold text-lg">
                      -₹{totalRow.expense.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-extrabold text-xl ${
                      totalRow.net >= 0 ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {totalRow.net >= 0 ? '+' : ''}₹{totalRow.net.toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}