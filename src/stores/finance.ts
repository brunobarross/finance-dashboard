import { defineStore } from 'pinia';
import { useMonthNavigator, useFinance, useTransactionStats } from '../composables';
import { onMounted, computed } from 'vue';
import { useUserStore } from './user';
import type { Transaction, Wallet } from '../types';

export const useFinanceStore = defineStore('finance', () => {
  const userStore = useUserStore();
  const user = computed(() => userStore.user);

  const { currentMonth, nextMonth, prevMonth, setMonth, monthLabel } = useMonthNavigator();
  const {
    wallets,
    transactions,
    isLoading,
    error,
    fetchWallets,
    fetchTransactions,
    getWalletTransactions,
    addTransaction: originalAddTransaction,
    deleteTransaction,
    addWallet: originalAddWallet,
    deleteWallet,
  } = useFinance();

  const { totalIncome, totalExpenses, balance } = useTransactionStats({ transactions });

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!userStore.userId) throw new Error('User not authenticated');
    return originalAddTransaction({
      ...transaction,
      userId: userStore.userId,
    } as Omit<Transaction, 'id'>);
  };

  const addWallet = async (wallet: Omit<Wallet, 'id' | 'userId'>) => {
    console.log(wallet);
    if (!userStore.userId) throw new Error('User not authenticated');
    return originalAddWallet({
      ...wallet,
      userId: userStore.userId,
    } as Omit<Wallet, 'id'>);
  };

  onMounted(() => {
    fetchWallets();
  });

  return {
    user,
    currentMonth,
    monthLabel,
    wallets,
    transactions,
    isLoading,
    error,
    totalIncome,
    totalExpenses,
    balance,
    nextMonth,
    prevMonth,
    setMonth,
    fetchWallets,
    fetchTransactions,
    getWalletTransactions,
    addTransaction,
    deleteTransaction,
    addWallet,
    deleteWallet,
  };
});
