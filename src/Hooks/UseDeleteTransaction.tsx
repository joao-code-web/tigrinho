import axios, { AxiosResponse } from "axios";
import React from "react";

interface TransactionProps {
    name: string;
    value: number;
    id: string;
    created_at: string;
    updated_at: string;
}

export default function UseDeleteTransaction() {
    async function deleteTransaction(
        setFuncs: React.Dispatch<React.SetStateAction<TransactionProps[]>>,
        array: TransactionProps[],
        id: string
    ): Promise<AxiosResponse | undefined> {
        try {
            const response = await axios.delete(`http://localhost:3000/`, {
                params: {
                    id: id
                }
            });

            const deleteTransaction = array.filter((transaction) => transaction.id !== id);
            setFuncs(deleteTransaction);
            return response;
        } catch (error) {
            console.error("Error deleting transaction", error);
            return undefined;
        }
    }

    return {
        deleteTransaction,
    };
}
