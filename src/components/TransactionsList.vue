<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <div
      class="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between"
    >
      <h3 class="text-base sm:text-lg font-semibold text-gray-800">
        {{ $t('finance.transactions') }}
      </h3>
      <span class="text-xs sm:text-sm text-gray-500"
        >{{ transactions.length }} {{ $t('finance.records') }}</span
      >
    </div>

    <div v-if="transactions.length === 0" class="p-6 sm:p-8 text-center">
      <q-icon name="receipt_long" size="40px sm:48px" class="text-gray-300 mb-3" />
      <p class="text-gray-400 text-sm sm:text-base">{{ $t('finance.noTransactions') }}</p>
    </div>

    <q-list v-else separator class="responsive-list">
      <q-item
        v-for="transaction in transactions"
        :key="transaction.id"
        clickable
        v-ripple
        class="py-3 sm:py-4 px-3 sm:px-5 hover:bg-gray-50 transition-colors"
      >
        <q-item-section avatar class="min-w-0">
          <div
            :class="[
              'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
              transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100',
            ]"
          >
            <q-icon
              :name="transaction.type === 'income' ? 'arrow_downward' : 'arrow_upward'"
              :class="transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'"
              size="18px sm:20px"
            />
          </div>
        </q-item-section>

        <q-item-section class="min-w-0">
          <q-item-label class="font-medium text-gray-800 text-sm sm:text-base truncate">{{
            transaction.name
          }}</q-item-label>
          <q-item-label caption class="text-gray-500 text-xs sm:text-sm hidden sm:block">
            {{ getWalletName(transaction.walletId) }} - {{ transaction.description }}
          </q-item-label>
          <q-item-label caption class="text-gray-500 text-xs sm:text-sm sm:hidden">
            {{ transaction.description }}
          </q-item-label>
        </q-item-section>

        <q-item-section side class="text-right min-w-0">
          <q-item-label
            :class="[
              'font-semibold text-sm sm:text-base',
              transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600',
            ]"
          >
            {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.value) }}
          </q-item-label>
          <q-item-label caption class="text-gray-400 text-xs">
            {{ transaction.installment }}
          </q-item-label>
        </q-item-section>

        <q-item-section side class="min-w-0">
          <q-btn
            flat
            round
            dense
            icon="delete_outline"
            color="gray"
            size="xs sm:sm"
            class="hover:text-red-500 touch-manipulation"
            @click.stop="handleDelete(transaction.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';
import { useFormatters, useWalletApi } from '../composables';
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { transactions } = storeToRefs(useFinanceStore());
const { formatCurrency } = useFormatters();
const $q = useQuasar();
const { deleteTransaction } = useFinanceStore();
const { t } = useI18n();

const getWalletName = (walletId: string): string => {
  return t('finance.walletLabel');
};

const handleDelete = (id: string) => {
  $q.dialog({
    title: t('actions.confirmDelete'),
    message: t('actions.deleteMessage'),
    cancel: { flat: true, label: t('actions.cancel') },
    ok: { color: 'negative', label: t('actions.delete') },
  }).onOk(() => {
    deleteTransaction(id);
    $q.notify({ type: 'positive', message: t('actions.transactionDeleted'), position: 'top' });
  });
};
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
