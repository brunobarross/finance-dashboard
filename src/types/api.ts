export interface WalletDTO {
  id: string;
  name: string;
  color: string;
  userId: string;
}

export interface TransactionDTO {
  id: string;
  name: string;
  value: number;
  description: string;
  date: string;
  installment: string;
  type: 'income' | 'expense';
  walletId: string;
  userId: string;
}
