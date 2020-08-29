import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const foundTransaction = await transactionRepository.findOne({
      where: { id },
    });

    if (!foundTransaction) {
      throw new AppError('Transaction not found');
    }

    const transaction = await transactionRepository.remove(foundTransaction);

    await transactionRepository.delete(transaction);
  }
}

export default DeleteTransactionService;
