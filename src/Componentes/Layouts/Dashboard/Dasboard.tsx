import React, { useContext, useEffect, useState } from "react";
import UseContextApi from "../../../Contexts/UseContextApi";

interface Transaction {
  // Adicione os tipos necessários para suas transações
  name: string;
  value: number;
}

export default function Dashboard() {
  const { somas, transactions } = useContext(UseContextApi);
  const [allSomasTransactions, setAllSomasTransactions] = useState<number>(0);
  const [transactionsPositiveSum, setTransactionsPositiveSum] = useState<number>(0);
  const [transactionsNegativeSum, setTransactionsNegativeSum] = useState<number>(0);

  useEffect(() => {
    somas((soma: number) => setAllSomasTransactions(soma));

    const positiveTransactions: Transaction[] = transactions.filter((transaction: Transaction) => transaction.value > 0);
    const negativeTransactions: Transaction[] = transactions.filter((transaction: Transaction) => transaction.value < 0);

    const sumPositive: number = positiveTransactions.reduce((acc, transaction) => acc + transaction.value, 0);
    const sumNegative: number = negativeTransactions.reduce((acc, transaction) => acc + transaction.value, 0);

    setTransactionsPositiveSum(sumPositive);
    setTransactionsNegativeSum(sumNegative);
  }, [somas, transactions]);

  return (
    <div className="dashboard">
      <div className="dashTotal"><h1>Saldo Total <br />{allSomasTransactions}</h1></div>
      <div className="dashPositive"><h1><span>Receitas</span> <br />{transactionsPositiveSum}</h1></div>
      <div className="dashNegative"><h1><span>Despesas</span> <br />{transactionsNegativeSum}</h1></div>
    </div>
  );
}
