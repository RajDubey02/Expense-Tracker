import Summary from '../components/Summary';
import Filters from '../components/Filters';
import TransactionChart from '../components/TransactionChart';
import SummaryHistory from '../components/SummaryHistory';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../slices/transactionSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' });

  useEffect(() => { dispatch(fetchTransactions()); }, [dispatch]);

  const handleApply = (f) => {
    setFilters(f);
    dispatch(fetchTransactions(f));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-blue-700 mb-8 text-center">Dashboard</h1>
      <Filters value={filters} onChange={setFilters} onApply={handleApply} />
      <Summary />
      <SummaryHistory filters={filters} />
      <TransactionChart />
    </div>
  );
}
