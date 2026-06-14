import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { Transaction, TransactionFilters } from '../types';

interface UseTransactionFiltersOptions {
  transactions: Ref<Transaction[]>;
}

interface UseTransactionFiltersReturn {
  filters: Ref<TransactionFilters>;
  setFilter: <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => void;
  clearFilters: () => void;
  hasActiveFilters: ComputedRef<boolean>;
}

export function useTransactionFilters(
  options: UseTransactionFiltersOptions
): UseTransactionFiltersReturn {
  const { transactions } = options;

  const filters = ref<TransactionFilters>({});

  const setFilter = <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => {
    filters.value[key] = value;
  };

  const clearFilters = () => {
    filters.value = {};
  };

  const hasActiveFilters = computed(() => {
    return Object.values(filters.value).some((v) => v !== undefined && v !== '');
  });

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
  };
}

interface UseTransactionStatsOptions {
  transactions: Ref<Transaction[]>;
}

interface UseTransactionStatsReturn {
  totalIncome: ComputedRef<number>;
  totalExpenses: ComputedRef<number>;
  balance: ComputedRef<number>;
  expensesByType: ComputedRef<Map<string, number>>;
  incomeByType: ComputedRef<Map<string, number>>;
  transactionCount: ComputedRef<number>;
  averageExpense: ComputedRef<number>;
  averageIncome: ComputedRef<number>;
}

export function useTransactionStats(
  options: UseTransactionStatsOptions
): UseTransactionStatsReturn {
  const { transactions } = options;

  const expenses = computed(() => transactions.value.filter((t) => t.type === 'expense'));
  const incomes = computed(() => transactions.value.filter((t) => t.type === 'income'));

  const totalExpenses = computed(() => expenses.value.reduce((sum, t) => sum + t.value, 0));

  const totalIncome = computed(() => incomes.value.reduce((sum, t) => sum + t.value, 0));

  const balance = computed(() => totalIncome.value - totalExpenses.value);

  const expensesByType = computed(() => {
    const map = new Map<string, number>();
    expenses.value.forEach((t) => {
      const current = map.get(t.name) || 0;
      map.set(t.name, current + t.value);
    });
    return map;
  });

  const incomeByType = computed(() => {
    const map = new Map<string, number>();
    incomes.value.forEach((t) => {
      const current = map.get(t.name) || 0;
      map.set(t.name, current + t.value);
    });
    return map;
  });

  const transactionCount = computed(() => transactions.value.length);

  const averageExpense = computed(() => {
    if (expenses.value.length === 0) return 0;
    return totalExpenses.value / expenses.value.length;
  });

  const averageIncome = computed(() => {
    if (incomes.value.length === 0) return 0;
    return totalIncome.value / incomes.value.length;
  });

  return {
    totalIncome,
    totalExpenses,
    balance,
    expensesByType,
    incomeByType,
    transactionCount,
    averageExpense,
    averageIncome,
  };
}

export function useWalletStats(walletId: string, transactions: Ref<Transaction[]>) {
  const walletTransactions = computed(() =>
    transactions.value.filter((t) => t.walletId === walletId)
  );

  const walletExpenses = computed(() =>
    walletTransactions.value.filter((t) => t.type === 'expense')
  );

  const walletIncomes = computed(() => walletTransactions.value.filter((t) => t.type === 'income'));

  const walletTotalExpenses = computed(() =>
    walletExpenses.value.reduce((sum, t) => sum + t.value, 0)
  );

  const walletTotalIncome = computed(() =>
    walletIncomes.value.reduce((sum, t) => sum + t.value, 0)
  );

  const walletBalance = computed(() => walletTotalIncome.value - walletTotalExpenses.value);

  return {
    walletTransactions,
    walletExpenses,
    walletIncomes,
    walletTotalExpenses,
    walletTotalIncome,
    walletBalance,
  };
}
