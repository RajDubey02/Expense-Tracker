export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center bg-white border-b border-gray-200 shadow z-30 px-6">
      <span className="text-xl font-black text-blue-700 tracking-tight">ExpensePro</span>
      <nav className="ml-auto gap-8 flex items-center">
        <a href="/" className="text-blue-700 font-semibold hover:underline">Dashboard</a>
        <a href="/transactions" className="text-blue-700 font-semibold hover:underline">Transactions</a>
        <a href="/add" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-5 py-2 transition shadow">+ Add Transaction</a>
      </nav>
    </header>
  );
}
