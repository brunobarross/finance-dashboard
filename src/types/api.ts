export interface WalletDTO {
  id: string;
  name: string;
  icon: string;
  color: string;
  userId: string;
  amount: number;
}

export interface TransactionDTO {
  id: string;
  name: string;
  value: number;
  description: string;
  date: string;
  installment: string;
  type: 'INCOME' | 'EXPENSE';
  walletId: string;
  userId: string;
}

export interface FinanceDashboardDTO {
  totalReceipts: number;
  totalExpenses: number;
  currentBalance: number;
}

export interface TransactionsPageDTO {
  transactions: TransactionDTO[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

