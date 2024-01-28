import { useContext, useEffect } from "react";
import UseContextApi from "../../../Contexts/UseContextApi";
import { MdDeleteForever } from "react-icons/md";

interface TransactionProps {
    name: string;
    value: number;
    id: string;
    created_at: string;
    updated_at: string;
}

interface ContextType {
    loader: (setFunc: React.Dispatch<React.SetStateAction<TransactionProps[]>>) => void;
    setTransactions: React.Dispatch<React.SetStateAction<TransactionProps[]>>;
    transactions: TransactionProps[];
    deleteTransaction: (setFunc: React.Dispatch<React.SetStateAction<TransactionProps[]>>, array: TransactionProps[], id: string) => Promise<void>;
}

export default function ListTransactions() {
    const { loader, setTransactions, transactions, deleteTransaction }: ContextType = useContext(UseContextApi);

    useEffect(() => {
        loader(setTransactions);
    }, []);

    return (
        <div>
            <h3>Transações</h3>
            <hr />

            <div className="alltransac">
                {transactions.map((transaction: TransactionProps) => (
                    <div className="transac" key={transaction.id}>
                        <h1>{transaction.name}</h1>
                        <div className="delete">
                            <h1 style={{ color: transaction.value < 0 ? 'red' : 'green' }}>{transaction.value}</h1>
                            <button onClick={() => deleteTransaction(setTransactions, transactions, transaction.id)}><MdDeleteForever /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
