import axios from "axios";
import { useState } from "react";

interface AddTransactionProps {
  name: string;
  value: number;
}

interface TransactionsProps {
  name: string;
  value: number;
  id: string;
  created_at: string;
  updated_at: string;
}

export default function UseAddTransaction() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  async function addTransaction({ name, value }: AddTransactionProps) {
    try {
      const data = { name, value };
      const response = await axios.post("http://localhost:3000", data);

      // Verifica se a resposta contém os dados esperados
      if (response.data && response.data.id) {
        const newTransaction: TransactionsProps = response.data;
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      } else {
        console.error("Resposta da API não contém dados esperados:", response);
        // Trate de acordo com os requisitos do seu aplicativo
      }
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      // Trate o erro de forma adequada, se necessário
    }
  }

  return {
    addTransaction,
    transactions,
    setTransactions,
  };
}
