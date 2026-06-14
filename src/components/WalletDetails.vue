<template>
  <div class="bg-white rounded-lg p-3 sm:p-4">
    <div class="flex items-center justify-between mb-2 sm:mb-3">
      <span class="text-xs sm:text-sm font-medium text-gray-600">{{
        $t('finance.walletTransactions')
      }}</span>
      <span class="text-xs text-gray-400"
        >{{ wallet?.transactions.length }} {{ $t('finance.records') }}</span
      >
    </div>

    <div v-if="!wallet?.transactions.length" class="text-center py-3 sm:py-4">
      <p class="text-gray-400 text-xs sm:text-sm">{{ $t('finance.noTransactionsMonth') }}</p>
    </div>

    <div v-else class="space-y-1 sm:space-y-2">
      <div
        v-for="t in wallet.transactions"
        :key="t.id"
        class="flex items-center justify-between py-2 sm:py-2.5 px-2 sm:px-3 bg-gray-50 rounded-lg"
      >
        <div class="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            :class="[
              'w-2 h-2 rounded-full flex-shrink-0',
              t.type === 'income' ? 'bg-emerald-500' : 'bg-red-500',
            ]"
          />
          <span class="text-xs sm:text-sm text-gray-700 truncate">{{ t.name }}</span>
        </div>
        <span
          :class="[
            'text-xs sm:text-sm font-medium flex-shrink-0 ml-2',
            t.type === 'income' ? 'text-emerald-600' : 'text-red-600',
          ]"
        >
          {{ t.type === 'income' ? '+' : '-' }}{{ formatCurrency(t.value) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormatters } from '../composables';

interface WalletSummary {
  id: string;
  name: string;
  color: string;
  icon: string;
  transactions: Array<{ id: string; name: string; value: number; type: 'income' | 'expense' }>;
}

defineProps<{ wallet?: WalletSummary }>();

const { formatCurrency } = useFormatters();
</script>
