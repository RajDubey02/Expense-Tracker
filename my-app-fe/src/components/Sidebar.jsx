






// import { NavLink } from "react-router-dom";
// import { LayoutDashboard, Receipt, TrendingUp, Plus } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", path: "/", icon: LayoutDashboard },
//   { label: "Transactions", path: "/transactions", icon: Receipt },
//   { label: "Financial Summary", path: "/summary", icon: TrendingUp },
//   { label: "Add Transaction", path: "/add", icon: Plus }
// ];

// export default function Sidebar() {
//   return (
//     <aside className="fixed top-16 left-0 bottom-0 md:w-64 w-56 bg-white border-r border-gray-200 shadow-sm flex flex-col z-20">
//       <div className="px-6 py-6 border-b border-gray-100">
//         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h3>
//       </div>
      
//       <nav className="flex-1 flex flex-col gap-1 px-4 py-4">
//         {navItems.map(item => {
//           const Icon = item.icon;
//           return (
//             <NavLink 
//               end 
//               to={item.path} 
//               key={item.label} 
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
//                   isActive 
//                     ? "bg-blue-600 text-white shadow-md" 
//                     : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//                 }`
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
//                     isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"
//                   }`} />
//                   <span className="font-medium text-sm">{item.label}</span>
//                 </>
//               )}
//             </NavLink>
//           );
//         })}
//       </nav>

//       <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
//         <p className="text-xs text-gray-500 text-center">Expense Tracker v1.0</p>
//       </div>
//     </aside>
//   );
// }

















import { NavLink } from "react-router-dom";
import { LayoutDashboard, Receipt, TrendingUp, Plus, Upload } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Transactions", path: "/transactions", icon: Receipt },
  { label: "Financial Summary", path: "/summary", icon: TrendingUp },
  { label: "Add Transaction", path: "/add", icon: Plus },
  { label: "Bulk Upload", path: "/bulk-upload", icon: Upload }
];

export default function Sidebar({ isOpen, close }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-sm flex-col z-20">
        <SidebarContent close={close} />
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm bg-opacity-10" onClick={close} />

        <aside
          className={`fixed top-16 left-0 bottom-0 w-64 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent close={close} />
        </aside>
      </div>
    </>
  );
}

function SidebarContent({ close }) {
  return (
    <>
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
              onClick={() => window.innerWidth < 768 && close()}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"
                    }`}
                  />
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
    </>
  );
}