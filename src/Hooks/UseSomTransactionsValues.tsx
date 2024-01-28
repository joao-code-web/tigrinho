    import axios from 'axios';

    export default function UseSomTransactionsValues() {
        async function somas(setFunc) {
            try {
                const response = await axios.get("http://localhost:3000");
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
