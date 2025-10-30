// import { NavLink } from "react-router-dom";

// const navItems = [
//   { label: "Dashboard", path: "/", icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><path d="M4 13V7a1 1 0 0 1 1-1h3v8H5a1 1 0 0 1-1-1ZM12 5h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-3V5Z" fill="#1d4ed8"/></svg>) },
//   { label: "Transactions", path: "/transactions", icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" stroke="#475569" strokeWidth="2" /></svg>) },
//   { label: "Financial Summary", path: "/summary", icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><path d="M4 19h16M6 17V7m4 10V11m4 6V5m4 14V9" stroke="#0ea5e9" strokeWidth="2"/></svg>) },
//   { label: "Add Transaction", path: "/add", icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#15803d" strokeWidth="2" /></svg>) }
// ];

// export default function Sidebar() {
//   return (
//     <aside className="fixed top-16 left-0 bottom-0 md:w-56 w-48 bg-white border-r border-gray-200 shadow flex flex-col pt-8 z-20">
//       <nav className="flex-1 flex flex-col gap-2 px-3 mt-2">
//         {navItems.map(item => (
//           <NavLink end to={item.path} key={item.label} className={({ isActive }) =>
//             `flex items-center gap-3 px-4 py-3 rounded transition font-medium hover:bg-blue-50 ${isActive ? "bg-blue-100 text-blue-800" : "text-gray-700"}`
//           }>
//             {item.icon}
//             <span>{item.label}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }


















import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, TrendingUp, Plus } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Transactions", path: "/transactions", icon: Receipt },
  { label: "Financial Summary", path: "/summary", icon: TrendingUp },
  { label: "Add Transaction", path: "/add", icon: Plus }
];

export default function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 bottom-0 md:w-64 w-56 bg-white border-r border-gray-200 shadow-sm flex flex-col z-20">
      <div className="px-6 py-6 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h3>
      </div>
      
      <nav className="flex-1 flex flex-col gap-1 px-4 py-4">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink 
              end 
              to={item.path} 
              key={item.label} 
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"
                  }`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">Expense Tracker v1.0</p>
      </div>
    </aside>
  );
}