import axios, { AxiosResponse } from 'axios';

interface Transaction {
  value: string; // Adjust the type according to your data
  // Add other properties if needed
}

interface UseSomTransactionsValues {
  somas: (setFunc: (soma: number) => void) => Promise<void>;
}

const useSomTransactionsValues: () => UseSomTransactionsValues = () => {
  const somas: UseSomTransactionsValues['somas'] = async (setFunc) => {
    try {
      const response: AxiosResponse<Transaction[]> = await axios.get("http://localhost:3000");
      const data: Transaction[] = response.data;

      const somaAll: number = data.reduce((acc, transaction) => acc + parseFloat(transaction.value), 0);

      setFunc(somaAll);
    } catch (error) {
      console.error("Erro ao obter dados da API:", error);
    }
  };

  return {
    somas,
  };
};

export default useSomTransactionsValues;
