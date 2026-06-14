import WalletService from '../services/WalletService';
import { WalletDTO } from '../types/api';

export function useWalletApi() {
  const getWallets = () => WalletService.getAll();
  const createWallet = (data: Omit<WalletDTO, 'id'>) => WalletService.create(data);
  const updateWallet = (id: string, data: Partial<WalletDTO>) => WalletService.update(id, data);
  const deleteWallet = (id: string) => WalletService.delete(id);

  return {
    getWallets,
    createWallet,
    updateWallet,
    deleteWallet,
  };
}
