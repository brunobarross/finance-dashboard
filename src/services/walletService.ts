import api from '../api/axios';
import { WalletDTO } from '../types/api';

class WalletService {
  async getAll(): Promise<WalletDTO[]> {
    try {
      const response = await api.get<WalletDTO[]>('/wallets');
      return response.data;
    } catch (error) {
      console.error('Error fetching wallets:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<WalletDTO> {
    try {
      const response = await api.get<WalletDTO>(`/wallets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching wallet ${id}:`, error);
      throw error;
    }
  }

  async create(wallet: Omit<WalletDTO, 'id'>): Promise<WalletDTO> {
    try {
      const response = await api.post<WalletDTO>('/wallets', wallet);
      return response.data;
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  }

  async update(id: string, wallet: Partial<WalletDTO>): Promise<WalletDTO> {
    try {
      const response = await api.put<WalletDTO>(`/wallets/${id}`, wallet);
      return response.data;
    } catch (error) {
      console.error(`Error updating wallet ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/wallets/${id}`);
    } catch (error) {
      console.error(`Error deleting wallet ${id}:`, error);
      throw error;
    }
  }
}

export default new WalletService();
