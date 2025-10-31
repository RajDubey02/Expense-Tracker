// import { useEffect, useState } from 'react';
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
// import { getSummary } from '../services/transactions';

// export default function SummaryHistory({ filters }) {
//   const [data, setData] = useState({ totals: { totalIncome: 0, totalExpense: 0, net: 0 }, monthly: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [months, setMonths] = useState(6);

//   const load = async (m, f) => {
//     try {
//       setLoading(true);
//       const res = await getSummary({ months: m, ...f });
//       setData(res);
//       setError('');
//     } catch (e) {
//       setError('Failed to load summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { load(months, filters); }, [months, filters]);

//   if (loading) return <div className="bg-white p-6 rounded-xl shadow">Loading summary...</div>;
//   if (error) return <div className="bg-white p-6 rounded-xl shadow text-red-500">{error}</div>;

//   const { totals, monthly } = data;

//   return (
//     <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
//       <div className="flex items-center justify-between mb-4">
//         <div className="text-lg font-bold text-gray-700">Financial Summary</div>
//         <div className="flex gap-2">
//           <button onClick={() => setMonths(3)} className={`px-3 py-1 rounded text-sm ${months===3?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'}`}>3 mo</button>
//           <button onClick={() => setMonths(6)} className={`px-3 py-1 rounded text-sm ${months===6?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'}`}>6 mo</button>
//           <button onClick={() => setMonths(12)} className={`px-3 py-1 rounded text-sm ${months===12?'bg-blue-600 text-white':'bg-gray-100 text-gray-700'}`}>12 mo</button>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-6 mb-6">
//         <div className="flex-1 min-w-[200px] bg-blue-50 border border-blue-100 rounded-xl p-4">
//           <div className="text-xs uppercase text-blue-700 font-semibold">Total Income</div>
//           <div className="text-2xl font-extrabold text-blue-800">₹{totals.totalIncome}</div>
//         </div>
//         <div className="flex-1 min-w-[200px] bg-rose-50 border border-rose-100 rounded-xl p-4">
//           <div className="text-xs uppercase text-rose-700 font-semibold">Total Expense</div>
//           <div className="text-2xl font-extrabold text-rose-800">₹{totals.totalExpense}</div>
//         </div>
//         <div className="flex-1 min-w-[200px] bg-emerald-50 border border-emerald-100 rounded-xl p-4">
//           <div className="text-xs uppercase text-emerald-700 font-semibold">Net</div>
//           <div className="text-2xl font-extrabold text-emerald-800">₹{totals.net}</div>
//         </div>
//       </div>

//       <div className="h-72">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={monthly}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="label" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="income" name="Income" fill="#22c55e" />
//             <Bar dataKey="expense" name="Expense" fill="#ef4444" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


















import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Calendar } from 'lucide-react';
import { getSummary } from '../services/transactions';

export default function SummaryHistory({ filters }) {
  const [data, setData] = useState({ totals: { totalIncome: 0, totalExpense: 0, net: 0 }, monthly: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [months, setMonths] = useState(6);

  const load = async (m, f) => {
    try {
      setLoading(true);
      const res = await getSummary({ months: m, ...f });
      setData(res);
      setError('');
    } catch (e) {
      setError('Failed to load summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(months, filters); }, [months, filters]);

  if (loading) return <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-500">Loading summary...</div>;
  if (error) return <div className="bg-white p-8 rounded-xl shadow-md text-center text-red-500">{error}</div>;

  const { totals, monthly } = data;
  
  // Ensure totals has default values
  const safeTotals = totals || { totalIncome: 0, totalExpense: 0, net: 0 };
  const safeMonthly = Array.isArray(monthly) ? monthly : [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Financial Summary</h3>
            <p className="text-sm text-gray-500">Monthly breakdown</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setMonths(3)} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              months === 3 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            3 Months
          </button>
          <button 
            onClick={() => setMonths(6)} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              months === 6 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            6 Months
          </button>
          <button 
            onClick={() => setMonths(12)} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              months === 12 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            12 Months
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-xs uppercase text-green-700 font-semibold tracking-wide mb-1">Total Income</p>
          <p className="text-2xl font-bold text-green-800">₹{safeTotals.totalIncome.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
          <p className="text-xs uppercase text-red-700 font-semibold tracking-wide mb-1">Total Expense</p>
          <p className="text-2xl font-bold text-red-800">₹{safeTotals.totalExpense.toLocaleString('en-IN')}</p>
        </div>
        <div className={`bg-gradient-to-br ${
          safeTotals.net >= 0 
            ? 'from-blue-50 to-blue-100 border-blue-200' 
            : 'from-orange-50 to-orange-100 border-orange-200'
        } border rounded-lg p-4`}>
          <p className={`text-xs uppercase font-semibold tracking-wide mb-1 ${
            safeTotals.net >= 0 ? 'text-blue-700' : 'text-orange-700'
          }`}>
            Net Balance
          </p>
          <p className={`text-2xl font-bold ${
            safeTotals.net >= 0 ? 'text-blue-800' : 'text-orange-800'
          }`}>
            ₹{safeTotals.net.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="h-80 bg-gray-50 rounded-lg p-4" style={{ minHeight: '320px' }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={280}>
          <BarChart data={safeMonthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
            />
            <Bar dataKey="income" name="Income" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}