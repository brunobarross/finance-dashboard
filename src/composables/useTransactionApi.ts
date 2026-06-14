import TransactionService from '../services/TransactionService';
import { TransactionDTO } from '../types/api';

export function useTransactionApi() {
  const getTransactions = () => TransactionService.getAll();
  
  const createTransaction = (data: Omit<TransactionDTO, 'id'>) => TransactionService.create(data);
  
  const updateTransaction = (id: string, data: Partial<TransactionDTO>) =>
    TransactionService.update(id, data);
    
  const deleteTransaction = (id: string) => TransactionService.delete(id);

  return {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
