import { useContext, useEffect, useState } from "react";
import UseContextApi from "../../../Contexts/UseContextApi";

export default function Dashboard() {
    const { somas, transactions } = useContext(UseContextApi);
    const [allSomasTransactions, setAllSomasTransactions] = useState<number>(0);
    const [transactionsPositiveSum, setTransactionsPositiveSum] = useState<number>(0);
    const [transactionsNegativeSum, setTransactionsNegativeSum] = useState<number>(0);

    useEffect(() => {
        somas((soma) => setAllSomasTransactions(soma));

        const positiveTransactions = transactions.filter((transaction) => transaction.value > 0);
        const negativeTransactions = transactions.filter((transaction) => transaction.value < 0);

        const sumPositive = positiveTransactions.reduce((acc, transaction) => acc + transaction.value, 0);
        const sumNegative = negativeTransactions.reduce((acc, transaction) => acc + transaction.value, 0);

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
