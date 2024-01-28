import Card from "./Componentes/Card/Card";
import ApiContext from "./Contexts/UseContextApi";
import UseAddTransaction, { AddTransactionProps, TransactionsProps, TransactionProps } from "./Hooks/UseAddTransaction";
import UseGetTransactions from "./Hooks/UseGetTransaction";
import UseDeleteTransaction from "./Hooks/UseDeleteTransaction";
import UseSomTransactionsValues from "./Hooks/UseSomTransactionsValues";

import "./App.css";

function App() {
  const {
    addTransaction,
    transactions,
    setTransactions,
  } = UseAddTransaction() as {
    addTransaction: ({ name, value }: AddTransactionProps) => Promise<void>,
    transactions: TransactionsProps[],
    setTransactions: React.Dispatch<React.SetStateAction<TransactionsProps[]>>,
  };

  const { loader } = UseGetTransactions();
  const { deleteTransaction } = UseDeleteTransaction();
  const { somas } = UseSomTransactionsValues();

  return (
    <ApiContext.Provider value={{ addTransaction, transactions, setTransactions, loader, deleteTransaction, somas }}>
      <Card />
    </ApiContext.Provider>
  );
}

export default App;
