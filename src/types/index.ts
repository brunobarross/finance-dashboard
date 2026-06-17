export type TransactionType = 'EXPENSE' | 'INCOME';

export interface Transaction {
  id: string;
  name: string;
  value: number;
  installment: string;
  walletId: string;
  description: string;
  date: string;
  type: TransactionType;
  userId: string;
}

export interface Wallet {
  id: string;
  name: string;
  color: string;
  icon: string;
  userId: string;
}

export interface MonthData {
  month: number;
  year: number;
}

export interface WalletSummary extends Wallet {
  transactions: Transaction[];
  total: number;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}

export interface TransactionFilters {
  walletId?: string;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export interface CreateTransactionPayload {
  name: string;
  value: number;
  installment?: string;
  walletId: string;
  description?: string;
  date: string;
  type: TransactionType;
}

export interface CreateWalletPayload {
  name: string;
  color: string;
  icon: string;
}

// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}
