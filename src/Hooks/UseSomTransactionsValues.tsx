import axios from 'axios';

import { Dispatch, SetStateAction } from "react";

interface Transaction {
  value: string; // Ou ajuste para o tipo real do valor
}

interface UseSomTransactionsValuesProps {
    setFunc: Dispatch<SetStateAction<number>>;
}

export default function UseSomTransactionsValues() {
    async function somas({ setFunc }: UseSomTransactionsValuesProps) {
        try {
            const response = await axios.get<Transaction[]>("http://localhost:3000");
            const data = response.data;

            const somaAll = data.reduce((acc, transaction) => acc + parseFloat(transaction.value), 0);

            setFunc(somaAll);
        } catch (error) {
            console.error("Erro ao obter dados da API:", error);
        }
    }

    return {
        somas
    };
}
