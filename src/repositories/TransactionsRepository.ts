import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(transactions: Transaction[]): Promise<Balance> {
    const income = Number(
      transactions
        .filter(transaction => transaction.type === 'income')
        .map(transaction => transaction.value)
        .reduce((sum, total) => Number(sum) + Number(total), 0),
    );
    const outcome = Number(
      transactions
        .filter(transaction => transaction.type === 'outcome')
        .map(transaction => transaction.value)
        .reduce((sum, total) => Number(sum) + Number(total), 0),
    );

    const total = income - outcome;

    const Balance = {
      income,
      outcome,
      total,
    };

    return Balance;
  }
}

export default TransactionsRepository;
