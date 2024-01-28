import axios from "axios";
import { useState } from "react";

interface AddTransactionProps {
    name: string;
    value: number;
}

interface transactionsProps {
    name: string;
    value: number;
    id: string;
    created_at: string;
    updated_at: string;
}

export default function UseAddTransaction() {

    const [transactions, setTransactions] = useState<transactionsProps[]>([]);

    async function addTransaction({ name, value }: AddTransactionProps) {
        try {
            const data = { name, value }; // Objeto contendo os dados da pessoa
            const response = await axios.post("http://localhost:3000", data);
            setTransactions(allTransactions => [...allTransactions, response.data])
        } catch (error) {
            console.error("Erro ao adicionar pessoa:", error);
        }
    }

    return {
        addTransaction, transactions, setTransactions
    };
}
