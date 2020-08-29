import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

import Category from '../models/Category';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_title: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_title,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const category: Category | undefined = await categoryRepository.findOne({
      where: { title: `${category_title}` },
    });

    if (category) {
      const categoryId = category.id;

      const transaction = transactionRepository.create({
        title,
        value,
        type,
        category_id: categoryId,
      });

      await transactionRepository.save(transaction);
      return transaction;
    }

    const newCategory = await categoryRepository.create({
      title: category_title,
    });
    const savedCategory = await categoryRepository.save(newCategory);

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: savedCategory.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
