/* eslint-disable no-plusplus */
import loadCSV from '../config/import';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  public async execute(filePath: string): Promise<Transaction[]> {
    const data = await loadCSV(`${filePath}`);
    const createTransaction = new CreateTransactionService();

    const transactions = [];
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const transaction = await createTransaction.execute({
        title: data[i][0],
        value: Number(data[i][2]),
        type: data[i][1] as 'income' | 'outcome',
        category_title: data[i][3],
      });

      transactions.push(transaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
