// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";
// import AddTransaction from "./pages/AddTransaction";
// import FinancialSummary from "./pages/FinancialSummary";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div className="flex pt-16 min-h-screen ">
//         <Sidebar />
//         <main className="flex-1 ml-0 md:ml-64 px-6 py-6">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/transactions" element={<Transactions />} />
//             <Route path="/add" element={<AddTransaction />} />
//             <Route path="/summary" element={<FinancialSummary />} />
//           </Routes>
//         </main>
//       </div>
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="colored" />
//     </BrowserRouter>
//   );
// }






import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import FinancialSummary from "./pages/FinancialSummary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <BrowserRouter>
      <Navbar isOpen={isOpen} toggle={toggle} />
      
      <div className="flex pt-16 min-h-screen">
        <Sidebar isOpen={isOpen} close={close} />
        
        <main className="flex-1 ml-0 md:ml-64 px-6 py-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/summary" element={<FinancialSummary />} />
          </Routes>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="colored" />
    </BrowserRouter>
  );
}