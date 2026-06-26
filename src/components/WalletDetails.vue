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
      <WalletDetailsTransactionItem
        v-for="transaction in wallet.transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WalletDetailsTransactionItem from './WalletDetailsTransactionItem.vue';

import { Transaction } from 'src/types';

interface WalletSummary {
  id: string;
  name: string;
  color: string;
  icon: string;
  transactions: Transaction[];
}

defineProps<{ wallet?: WalletSummary }>();
</script>
