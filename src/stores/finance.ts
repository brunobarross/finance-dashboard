import { defineStore } from 'pinia';
import { useMonthNavigator, useFinance } from '../composables';
import { onMounted, computed, watch } from 'vue';
import { useUserStore } from './user';
import type { Transaction, Wallet } from '../types';

export const useFinanceStore = defineStore('finance', () => {
  const userStore = useUserStore();
  const user = computed(() => userStore.user);

  const { currentMonth, nextMonth, prevMonth, setMonth, monthLabel } = useMonthNavigator();
  const {
    wallets,
    transactions,
    summary,
    isLoading,
    error,
    fetchDashboardSummary,
    fetchWallets,
    fetchTransactions,
    getWalletTransactions,
    addTransaction: originalAddTransaction,
    deleteTransaction: originalDeleteTransaction,
    addWallet: originalAddWallet,
    deleteWallet: originalDeleteWallet,
  } = useFinance();

  const totalReceipts = computed(() => summary.value.totalReceipts);
  const totalExpenses = computed(() => summary.value.totalExpenses);
  const currentBalance = computed(() => summary.value.currentBalance);

  const refreshDashboardSummary = async () => {
    await fetchDashboardSummary({
      month: currentMonth.value.month,
      year: currentMonth.value.year,
    });
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!userStore.userId) throw new Error('User not authenticated');
    const createdTransaction = await originalAddTransaction({
      ...transaction,
      userId: userStore.userId,
    } as Omit<Transaction, 'id'>);
    await refreshDashboardSummary();
    return createdTransaction;
  };

  const addWallet = async (wallet: Omit<Wallet, 'id' | 'userId'>) => {
    console.log(wallet);
    if (!userStore.userId) throw new Error('User not authenticated');
    return originalAddWallet({
      ...wallet,
      userId: userStore.userId,
    } as Omit<Wallet, 'id'>);
  };

  const deleteTransaction = async (id: string) => {
    await originalDeleteTransaction(id);
    await refreshDashboardSummary();
  };

  const deleteWallet = async (id: string) => {
    await originalDeleteWallet(id);
    await refreshDashboardSummary();
  };

  onMounted(() => {
    const filters = {
      month: currentMonth.value.month,
      year: currentMonth.value.year,
    };
    fetchWallets(filters);
    refreshDashboardSummary();
  });

  watch(
    currentMonth,
    () => {
      fetchWallets({ month: currentMonth.value.month, year: currentMonth.value.year });
      refreshDashboardSummary();
    },
    { deep: true }
  );

  return {
    user,
    currentMonth,
    monthLabel,
    wallets,
    transactions,
    summary,
    isLoading,
    error,
    totalReceipts,
    totalExpenses,
    currentBalance,
    nextMonth,
    prevMonth,
    setMonth,
    fetchDashboardSummary,
    fetchWallets,
    fetchTransactions,
    getWalletTransactions,
    addTransaction,
    deleteTransaction,
    addWallet,
    deleteWallet,
  };
});
