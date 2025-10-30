// import { useState, useEffect } from 'react';

// export default function Filters({ value, onApply, onChange, showActions = true }) {
//   const [filters, setFilters] = useState(value || { type: '', category: '', startDate: '', endDate: '' });

//   useEffect(() => {
//     if (value) setFilters(value);
//   }, [value]);

//   const apply = (f) => onApply && onApply(f);

//   const handleChange = e => {
//     const next = { ...filters, [e.target.name]: e.target.value };
//     setFilters(next);
//     onChange && onChange(next);
//   };

//   const applyFilters = () => {
//     if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
//       const next = { ...filters, startDate: filters.endDate, endDate: filters.startDate };
//       setFilters(next);
//       apply(next);
//       return;
//     }
//     apply(filters);
//   };

//   const clearFilters = () => {
//     const cleared = { type: '', category: '', startDate: '', endDate: '' };
//     setFilters(cleared);
//     apply(cleared);
//     onChange && onChange(cleared);
//   };

//   return (
//     <div className="bg-white border border-gray-100 shadow rounded-xl p-4 mb-6">
//       <div className="text-base font-semibold text-blue-600 mb-3">Filter</div>
//       <div className="flex flex-wrap gap-4 items-end">
//         <div>
//           <label className="block text-xs font-semibold text-gray-500">Type</label>
//           <select name="type" value={filters.type} className="input-field min-w-[110px]" onChange={handleChange}>
//             <option value="">All</option>
//             <option value="income">Income</option>
//             <option value="expense">Expense</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-gray-500">Category</label>
//           <input name="category" value={filters.category} placeholder="Category" className="input-field min-w-[120px]" onChange={handleChange} />
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-gray-500">From</label>
//           <input name="startDate" type="date" className="input-field" value={filters.startDate} onChange={handleChange} />
//         </div>
//         <div>
//           <label className="block text-xs font-semibold text-gray-500">To</label>
//           <input name="endDate" type="date" className="input-field" value={filters.endDate} onChange={handleChange} />
//         </div>
//         {showActions && (
//           <div className="flex gap-2 ml-auto">
//             <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition shadow" onClick={applyFilters}>Apply</button>
//             <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium transition" onClick={clearFilters}>Clear</button>
//           </div>
//         )}
//       </div>
//       <style jsx>{`
//         .input-field {
//           @apply border border-gray-300 rounded-md px-2 py-2 focus:border-blue-400 text-base transition outline-none shadow-sm;
//         }
//       `}</style>
//     </div>
//   );
// }
















import { useState, useEffect } from 'react';
import { Filter, Calendar, Tag } from 'lucide-react';

export default function Filters({ value, onApply, onChange, showActions = true }) {
  const [filters, setFilters] = useState(value || { type: '', category: '', startDate: '', endDate: '' });

  useEffect(() => {
    if (value) setFilters(value);
  }, [value]);

  const apply = (f) => onApply && onApply(f);

  const handleChange = e => {
    const next = { ...filters, [e.target.name]: e.target.value };
    setFilters(next);
    onChange && onChange(next);
  };

  const applyFilters = () => {
    if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
      const next = { ...filters, startDate: filters.endDate, endDate: filters.startDate };
      setFilters(next);
      apply(next);
      return;
    }
    apply(filters);
  };

  const clearFilters = () => {
    const cleared = { type: '', category: '', startDate: '', endDate: '' };
    setFilters(cleared);
    apply(cleared);
    onChange && onChange(cleared);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-bold text-gray-800">Filters</span>
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
              onClick={applyFilters}
            >
              Apply
            </button>
            <button 
              className="bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 px-5 py-2 rounded-xl text-gray-700 text-sm font-semibold transition-all duration-200" 
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Type</label>
          <div className="relative">
            <select 
              name="type" 
              value={filters.type} 
              className="input-field w-full appearance-none cursor-pointer" 
              onChange={handleChange}
            >
              <option value="">All Types</option>
              <option value="income">💰 Income</option>
              <option value="expense">💸 Expense</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              name="category" 
              value={filters.category} 
              placeholder="Enter category" 
              className="input-field w-full pl-10" 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Start Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input 
              name="startDate" 
              type="date" 
              className="input-field w-full pl-10" 
              value={filters.startDate} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">End Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input 
              name="endDate" 
              type="date" 
              className="input-field w-full pl-10" 
              value={filters.endDate} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          @apply border-2 border-gray-300 rounded-xl px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm transition-all duration-200 outline-none bg-white shadow-sm hover:border-gray-400;
        }
      `}</style>
    </div>
  );
}