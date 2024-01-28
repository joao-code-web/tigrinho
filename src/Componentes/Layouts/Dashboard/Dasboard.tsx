import React, { useContext, useEffect, useState } from "react";
import UseContextApi from "../../../Contexts/UseContextApi";

interface Transaction {
    value: number;
    // Add other properties if needed
}

interface DashboardProps {
    name: string;
    value: number
}

interface AppContext {
    somas: (callback: (soma: number) => void) => void;
    transactions: Transaction[]; // Ajuste de acordo com a estrutura real dos dados
    // Add other context properties if needed
}

const Dashboard: React.FC<DashboardProps> = () => {
    const { somas, transactions } = useContext<AppContext>(UseContextApi);
    const [allSomasTransactions, setAllSomasTransactions] = useState<number>(0);
    const [transactionsPositiveSum, setTransactionsPositiveSum] = useState<number>(0);
    const [transactionsNegativeSum, setTransactionsNegativeSum] = useState<number>(0);

    useEffect(() => {
        somas((soma: number) => setAllSomasTransactions(soma));

        const positiveTransactions: Transaction[] = transactions.filter(
            (transaction: Transaction) => transaction.value > 0
        );

        const negativeTransactions: Transaction[] = transactions.filter(
            (transaction: Transaction) => transaction.value < 0
        );

        const sumPositive: number = positiveTransactions.reduce(
            (acc: number, transaction: Transaction) => acc + transaction.value,
            0
        );

        const sumNegative: number = negativeTransactions.reduce(
            (acc: number, transaction: Transaction) => acc + transaction.value,
            0
        );

        setTransactionsPositiveSum(sumPositive);
        setTransactionsNegativeSum(sumNegative);
    }, [somas, transactions]);

    return (
        <div className="dashboard">
            <div className="dashTotal">
                <h1>
                    Saldo Total <br />
                    {allSomasTransactions}
                </h1>
            </div>
            <div className="dashPositive">
                <h1>
                    <span>Receitas</span> <br />
                    {transactionsPositiveSum}
                </h1>
            </div>
            <div className="dashNegative">
                <h1>
                    <span>Despesas</span> <br />
                    {transactionsNegativeSum}
                </h1>
            </div>
        </div>
    );
};

export default Dashboard;
