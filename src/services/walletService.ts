import api from '../api/axios';
import { WalletDTO } from '../types/api';

interface CreateWalletDTO {
  name: string;
  color: string;
  icon: string;
  userId: string;
}

class WalletService {
  async getAll(filters?: { month?: number; year?: number }): Promise<WalletDTO[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.month !== undefined) {
        // Assuming month is 0-indexed (like JavaScript Date.getMonth()) and backend expects 1-indexed
        const monthStr = (filters.month + 1).toString().padStart(2, '0');
        params.append('month', monthStr);
      }
      if (filters?.year) {
        params.append('year', filters.year.toString());
      }

      const queryString = params.toString();
      const url = `/wallets${queryString ? `?${queryString}` : ''}`;
      const response = await api.get<WalletDTO[]>(url);
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

  async create(wallet: CreateWalletDTO): Promise<WalletDTO> {
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
