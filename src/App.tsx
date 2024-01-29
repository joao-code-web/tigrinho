import { useEffect, useState } from "react";
import { api } from "./services/api";

interface TransactionProps {
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
  value: number;
}

interface SomTransactionProps {
  value: number;
}

export default function App() {
  const [allTransactions, setAllTransactions] = useState<TransactionProps[]>([]);
  const [allSomTransaction, setAllSomTransaction] = useState<SomTransactionProps | undefined>();
  const [positive, setPositive] = useState<number>(0);
  const [negative, setNegative] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    getTransactions();
  }, [deleteTransaction]); 

  async function getTransactions() {
    try {
      const response = await api.get("/");
      const transactions: TransactionProps[] = response.data;
      setAllTransactions(transactions);
      sumAllTransactions(transactions);
      filterValuesTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  function sumAllTransactions(transactions: TransactionProps[]) {
    const sum = transactions.reduce((total, transaction) => total + transaction.value, 0);
    setAllSomTransaction({ value: sum });
  }

  async function addTransaction() {
    try {
      const addResponse = await api.post("/", {
        name: name,
        value: value,
      });

      const newTransaction: TransactionProps = addResponse.data;
      setAllTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      getTransactions(); // Atualiza automaticamente a soma total
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  }


  async function deleteTransaction(id: string) {
    try {
      await api.delete(`/`, {
        params: {
          id: id
        }
      });
      setAllTransactions(allTransactions.filter((transaction) => transaction.id !== id));
      sumAllTransactions(allTransactions.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  function filterValuesTransactions(transactions: TransactionProps[]) {
    const positiveTransactions = transactions.filter((transaction) => transaction.value > 0);
    const negativeTransactions = transactions.filter((transaction) => transaction.value < 0);

    const sumPositive = positiveTransactions.reduce((total, transaction) => total + transaction.value, 0);
    const sumNegative = negativeTransactions.reduce((total, transaction) => total + transaction.value, 0);

    setPositive(sumPositive);
    setNegative(sumNegative);
  }

  return (
    <div className="card">
      <div className="dashBoard">
        <h1>{allSomTransaction?.value}</h1>
        <h1>{positive}</h1>
        <h1>{negative}</h1>
      </div>

      {allTransactions.map((transaction) => (
        <div key={transaction.id}>
          <p>Name: {transaction.name}</p>
          <p>Value: {transaction.value}</p>
          <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
        </div>
      ))}

      <input type="text" onChange={(e) => setName(e.target.value)} />
      <input type="text" onChange={(e) => setValue(Number(e.target.value))} />
      <button onClick={() => addTransaction()}>Add Transaction</button>
    </div>
  );
}
