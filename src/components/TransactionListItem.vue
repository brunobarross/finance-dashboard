<template>
  <q-item clickable v-ripple class="py-3 sm:py-4 px-3 sm:px-5 hover:bg-gray-50 transition-colors">
    <q-item-section avatar class="min-w-0">
      <div
        :class="[
          'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
          transaction.type === 'INCOME' ? 'bg-emerald-100' : 'bg-red-100',
        ]"
      >
        <q-icon
          :name="transaction.type === 'INCOME' ? 'arrow_downward' : 'arrow_upward'"
          :class="transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'"
          size="18px sm:20px"
        />
      </div>
    </q-item-section>

    <q-item-section class="min-w-0">
      <q-item-label class="font-medium text-gray-800 text-sm sm:text-base truncate"
        >{{ transaction.name }}
      </q-item-label>
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
          transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600',
        ]"
      >
        {{ transaction.type === 'INCOME' ? '+' : '-' }}{{ formatCurrency(transaction.value) }}
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
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useFormatters } from 'src/composables';
import { useFinanceStore } from 'src/stores/finance';
import { Transaction } from 'src/types';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ transaction: Transaction }>();

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
