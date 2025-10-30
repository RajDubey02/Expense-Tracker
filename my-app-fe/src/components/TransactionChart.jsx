// import { useSelector } from 'react-redux';
// import { useMemo, useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const ranges = [
//   { key: 'today', label: 'Today' },
//   { key: '7d', label: '7 Days' },
//   { key: 'month', label: 'This Month' },
// ];

// function toLocalMidnight(date) {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// }

// function parseAsLocal(dateInput) {
//   const d = new Date(dateInput);
//   if (!isNaN(d)) return toLocalMidnight(d);
//   return toLocalMidnight(new Date());
// }

// function isInRange(dateStr, key) {
//   const txDate = parseAsLocal(dateStr);
//   const now = toLocalMidnight(new Date());

//   if (key === 'today') {
//     return txDate.getTime() === now.getTime();
//   }
//   if (key === '7d') {
//     const start = new Date(now);
//     start.setDate(start.getDate() - 6);
//     return txDate >= start && txDate <= now;
//   }
//   if (key === 'month') {
//     const start = new Date(now.getFullYear(), now.getMonth(), 1);
//     const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//     return txDate >= start && txDate <= end;
//   }
//   return true;
// }

// const COLORS = ['#22c55e', '#ef4444'];

// export default function TransactionChart() {
//   const { list } = useSelector((state) => state.transaction);
//   const [range, setRange] = useState('today');

//   const { income, expense } = useMemo(() => {
//     const filtered = list.filter(tx => isInRange(tx.date, range));
//     const income = filtered.filter(x => x.type === 'income').reduce((a, b) => a + b.amount, 0);
//     const expense = filtered.filter(x => x.type === 'expense').reduce((a, b) => a + b.amount, 0);
//     return { income, expense };
//   }, [list, range]);

//   const data = [
//     { name: 'Income', value: income },
//     { name: 'Expense', value: expense },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-bold text-blue-700 text-lg">Spending Overview</h2>
//         <div className="flex gap-2">
//           {ranges.map(r => (
//             <button key={r.key} onClick={() => setRange(r.key)} className={`px-3 py-1 rounded text-sm transition ${range===r.key? 'bg-blue-600 text-white':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{r.label}</button>
//           ))}
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-3 gap-6 mb-4">
//         <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
//           <div className="text-xs uppercase text-blue-700 font-semibold">Range</div>
//           <div className="text-xl font-extrabold text-blue-800">{ranges.find(r=>r.key===range)?.label}</div>
//         </div>
//         <div className="bg-green-50 border border-green-100 rounded-xl p-4">
//           <div className="text-xs uppercase text-green-700 font-semibold">Income</div>
//           <div className="text-2xl font-extrabold text-green-800">₹{income}</div>
//         </div>
//         <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
//           <div className="text-xs uppercase text-rose-700 font-semibold">Expense</div>
//           <div className="text-2xl font-extrabold text-rose-800">₹{expense}</div>
//         </div>
//       </div>

//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

















import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChartIcon } from 'lucide-react';

const ranges = [
  { key: 'today', label: 'Today' },
  { key: '7d', label: '7 Days' },
  { key: 'month', label: 'This Month' },
];

function toLocalMidnight(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseAsLocal(dateInput) {
  const d = new Date(dateInput);
  if (!isNaN(d)) return toLocalMidnight(d);
  return toLocalMidnight(new Date());
}

function isInRange(dateStr, key) {
  const txDate = parseAsLocal(dateStr);
  const now = toLocalMidnight(new Date());

  if (key === 'today') {
    return txDate.getTime() === now.getTime();
  }
  if (key === '7d') {
    const start = new Date(now);
    start.setDate(start.getDate() - 6);
    return txDate >= start && txDate <= now;
  }
  if (key === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return txDate >= start && txDate <= end;
  }
  return true;
}

const COLORS = ['#22c55e', '#ef4444'];

export default function TransactionChart() {
  const { list } = useSelector((state) => state.transaction);
  const [range, setRange] = useState('today');

  const { income, expense } = useMemo(() => {
    const filtered = list.filter(tx => isInRange(tx.date, range));
    const income = filtered.filter(x => x.type === 'income').reduce((a, b) => a + b.amount, 0);
    const expense = filtered.filter(x => x.type === 'expense').reduce((a, b) => a + b.amount, 0);
    return { income, expense };
  }, [list, range]);

  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <PieChartIcon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Spending Overview</h3>
            <p className="text-sm text-gray-500">Income vs Expense</p>
          </div>
        </div>
        <div className="flex gap-2">
          {ranges.map(r => (
            <button 
              key={r.key} 
              onClick={() => setRange(r.key)} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                range === r.key 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <p className="text-xs uppercase text-purple-700 font-semibold tracking-wide mb-1">Period</p>
          <p className="text-xl font-bold text-purple-800">{ranges.find(r => r.key === range)?.label}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-xs uppercase text-green-700 font-semibold tracking-wide mb-1">Income</p>
          <p className="text-2xl font-bold text-green-800">₹{income.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
          <p className="text-xs uppercase text-red-700 font-semibold tracking-wide mb-1">Expense</p>
          <p className="text-2xl font-bold text-red-800">₹{expense.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="h-72 bg-gray-50 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              innerRadius={70} 
              outerRadius={110} 
              paddingAngle={5}
              strokeWidth={2}
              stroke="#fff"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}