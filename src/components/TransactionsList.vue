<template>
  <div class="app-surface rounded-xl overflow-hidden">
    <div
      class="px-4 sm:px-5 py-3 sm:py-4 border-b app-border flex items-center justify-between"
    >
      <h3 class="text-base sm:text-lg font-semibold text-app-text">
        {{ $t('finance.transactions') }}
      </h3>
      <span class="text-xs sm:text-sm app-text-muted"
        >{{ totalElements || transactions.length }} {{ $t('finance.records') }}</span
      >
    </div>

    <div v-if="transactions.length === 0" class="p-6 sm:p-8 text-center">
      <q-icon name="receipt_long" size="40px sm:48px" class="app-text-muted mb-3" />
      <p class="app-text-muted text-sm sm:text-base">{{ $t('finance.noTransactions') }}</p>
    </div>

    <template v-else>
      <q-list separator class="responsive-list">
        <TransactionListItem
          v-for="transaction in transactions"
          :key="transaction.id"
          :transactions="transactions"
        />
      </q-list>

      <div v-if="hasMoreTransactions" class="p-4 text-center border-t app-border">
        <q-btn
          outline
          color="primary"
          class="w-full sm:w-auto font-medium transition-all duration-200 hover:shadow-md"
          :loading="isLoadingMore"
          :label="$t('finance.loadMore')"
          icon-right="expand_more"
          @click="loadMoreTransactions"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';
import TransactionListItem from './TransactionListItem.vue';

const financeStore = useFinanceStore();
const { transactions, totalElements, hasMoreTransactions, isLoadingMore } = storeToRefs(financeStore);
const { loadMoreTransactions } = financeStore;
</script>

<style scoped>
.responsive-list :deep(.q-item) {
  min-height: 56px;
}
@media (max-width: 599px) {
  .responsive-list :deep(.q-item) {
    min-height: 52px;
    padding-left: 12px;
    padding-right: 8px;
  }
}
</style>
