import { useContext, useState, ChangeEvent } from "react";
import UseContextApi from "../../../Contexts/UseContextApi";

interface TransactionProps {
    name: string;
    value: number;
}

export function Form() {
    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<number>(0);

    const { addTransaction } = useContext(UseContextApi);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    };

    const handleAddTransaction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newTransaction: TransactionProps = { name, value };
        addTransaction(newTransaction);
    };

    return (
        <>
            <h3>Adicinar Transações</h3>
            <hr />
            <form action="">
                <label htmlFor="name">Nome</label>
                <input type="text" value={name} onChange={handleNameChange} />
                <label htmlFor="Valor">Valor <br /> (- Despesas, + Receita)</label>
                <input type="number" value={value} onChange={handleValueChange} />
                <button onClick={handleAddTransaction}>Add</button>
            </form>
        </>
    );
}
