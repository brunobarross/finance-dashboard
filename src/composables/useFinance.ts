import { ref, computed } from 'vue';
import type { FinanceSummary, Transaction, Wallet } from '../types';
import WalletService from '../services/walletService';
import TransactionService from '../services/transactionService';
import FinanceDashboardService from '../services/financeDashboardService';
import type { WalletDTO } from 'src/types/api';

export function useFinance() {
  const wallets = ref<WalletDTO[]>([]);
  const transactions = ref<Transaction[]>([]);
  const summary = ref<FinanceSummary>({
    totalReceipts: 0,
    totalExpenses: 0,
    currentBalance: 0,
  });
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const balanceColor = computed(() => {
    return summary.value.currentBalance >= 0 ? 'text-green-600' : 'text-red-600';
  });

  const normalizeTransaction = (transaction: Transaction) => ({
    ...transaction,
    installment: transaction.installment || '1/1',
  });

  const applyTransactionToWalletAmount = (transaction: Transaction, multiplier = 1) => {
    const amountDelta = (transaction.type === 'INCOME' ? transaction.value : -transaction.value) * multiplier;

    wallets.value = wallets.value.map((wallet) =>
      wallet.id === transaction.walletId
        ? {
            ...wallet,
            amount: Number((wallet.amount + amountDelta).toFixed(2)),
          }
        : wallet
    );
  };

  const fetchDashboardSummary = async (filters?: { month?: number; year?: number }) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await FinanceDashboardService.getSummary(filters);
      summary.value = {
        totalReceipts: data.totalReceipts,
        totalExpenses: data.totalExpenses,
        currentBalance: data.currentBalance,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch finance dashboard summary';
      error.value = errorMessage;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchWallets = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await WalletService.getAll();
      wallets.value = data.map((wallet) => ({
        ...wallet,
        icon: wallet.icon || 'account_balance_wallet',
      }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch wallets';
      error.value = errorMessage;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchTransactions = async (filters?: {
    month?: number;
    year?: number;
    wallet?: string;
  }) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await TransactionService.getAll(filters);
      transactions.value = data.map(normalizeTransaction);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transactions';
      error.value = errorMessage;
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const getWalletTransactions = async (walletId: string, month: number, year: number) => {
    try {
      const data = await TransactionService.getAll({
        wallet: walletId,
        month,
        year,
      });
      return data.map(normalizeTransaction);
    } catch (err) {
      console.error(`Failed to fetch transactions for wallet ${walletId}:`, err);
      return [];
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    isLoading.value = true;
    error.value = null;
    try {
      // Create TransactionDTO payload (remove extra fields if any)
      const payload = {
        name: transaction.name,
        value: transaction.value,
        description: transaction.description,
        date: transaction.date,
        installment: transaction.installment,
        type: transaction.type,
        walletId: transaction.walletId,
        userId: transaction.userId,
      };
      const data = await TransactionService.create(payload);
      const normalizedTransaction = normalizeTransaction(data);
      transactions.value.push(normalizedTransaction);
      applyTransactionToWalletAmount(normalizedTransaction);
      return normalizedTransaction;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add transaction';
      error.value = errorMessage;
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTransaction = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const deletedTransaction = transactions.value.find((transaction) => transaction.id === id);
      await TransactionService.delete(id);
      transactions.value = transactions.value.filter((t) => t.id !== id);
      if (deletedTransaction) {
        applyTransactionToWalletAmount(deletedTransaction, -1);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete transaction';
      error.value = errorMessage;
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const addWallet = async (wallet: Omit<Wallet, 'id'>) => {
    isLoading.value = true;
    error.value = null;
    try {
      const payload = {
        name: wallet.name,
        color: wallet.color,
        icon: wallet.icon,
        userId: wallet.userId, // This is crucial
      };
      const data = await WalletService.create(payload);
      wallets.value.push({
        ...data,
        icon: wallet.icon || 'account_balance_wallet',
        amount: data.amount ?? 0,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add wallet';
      error.value = errorMessage;
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteWallet = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      await WalletService.delete(id);
      wallets.value = wallets.value.filter((w) => w.id !== id);
      transactions.value = transactions.value.filter((t) => t.walletId !== id);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete wallet';
      error.value = errorMessage;
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    wallets,
    transactions,
    summary,
    isLoading,
    balanceColor,
    error,
    fetchDashboardSummary,
    fetchWallets,
    fetchTransactions,
    getWalletTransactions,
    addTransaction,
    deleteTransaction,
    addWallet,
    deleteWallet,
  };
}
