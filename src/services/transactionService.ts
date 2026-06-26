import api from '../api/axios';
import { TransactionDTO } from '../types/api';

class TransactionService {
  async getAll(filters?: {
    month?: number;
    year?: number;
    wallet?: string;
  }): Promise<TransactionDTO[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.month !== undefined) {
        const monthStr = (filters.month + 1).toString().padStart(2, '0');
        params.append('month', monthStr);
      }
      if (filters?.year) params.append('year', filters.year.toString());
      if (filters?.wallet) params.append('walletId', filters.wallet);

      const queryString = params.toString();
      const url = `/transactions${queryString ? `?${queryString}` : ''}`;

      const response = await api.get<TransactionDTO[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<TransactionDTO> {
    try {
      const response = await api.get<TransactionDTO>(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  }

  async create(transaction: Omit<TransactionDTO, 'id'>): Promise<TransactionDTO> {
    try {
      const response = await api.post<TransactionDTO>('/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async update(id: string, transaction: Partial<TransactionDTO>): Promise<TransactionDTO> {
    try {
      const response = await api.put<TransactionDTO>(`/transactions/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error(`Error updating transaction ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/transactions/${id}`);
    } catch (error) {
      console.error(`Error deleting transaction ${id}:`, error);
      throw error;
    }
  }
}

export default new TransactionService();
