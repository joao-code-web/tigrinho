import axios from "axios";


interface transactionsProps {
    name: string;
    value: number;
    id: string;
    created_at: string;
    updated_at: string;
}

export default function UseGetTransactions() {
    async function loader(setfunc: React.Dispatch<React.SetStateAction<transactionsProps[]>>) {
        const response = await axios.get("http://localhost:3000");
        setfunc(response.data)
        console.log(response.data)
    }

    return { loader }
}