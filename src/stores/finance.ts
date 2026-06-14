import { defineStore } from 'pinia';
import { useMonthNavigator, useFinance, useTransactionStats } from '../composables';
import { watch, onMounted } from 'vue';

export const useFinanceStore = defineStore('finance', () => {
  const { currentMonth, nextMonth, prevMonth, setMonth, monthLabel } = useMonthNavigator();
  const {
    wallets,
    transactions,
    isLoading,
    error,
    fetchWallets,
    fetchTransactions,
    getWalletTransactions,
    addTransaction,
    deleteTransaction,
    addWallet,
    deleteWallet,
  } = useFinance();

  const { totalIncome, totalExpenses, balance } = useTransactionStats({ transactions });

  // // Automatically fetch transactions when the month changes
  // watch(
  //   currentMonth,
  //   (newMonth) => {
  //     fetchTransactions({ month: newMonth.month, year: newMonth.year });
  //   },
  //   { deep: true, immediate: true }
  // );

  onMounted(() => {
    fetchWallets();
  });

  return {
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
