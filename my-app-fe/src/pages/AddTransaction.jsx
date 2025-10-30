import TransactionForm from "../components/TransactionForm";
export default function AddTransaction() {
  return (
    <div className="max-w-full mx-auto mt-12">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Add Transaction</h2>
      <TransactionForm />
    </div>
  );
}
