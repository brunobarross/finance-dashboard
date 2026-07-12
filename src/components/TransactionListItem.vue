<template>
  <q-item clickable v-ripple class="py-3 sm:py-4 px-3 sm:px-5 app-interactive-muted">
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
      <q-item-label class="font-medium text-app-text text-sm sm:text-base truncate"
        >{{ transaction.name }}
        <q-tooltip>{{ transaction.name }}</q-tooltip>
      </q-item-label>
      <q-item-label caption class="app-text-muted text-xs sm:text-sm hidden sm:block">
        {{ getWalletName() }} - {{ transaction.description }}
      </q-item-label>
      <q-item-label caption class="app-text-muted text-xs sm:text-sm sm:hidden">
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
      <q-item-label
        caption
        :class="[
          'text-xs',
          isLastInstallment(transaction.installment) ? 'text-amber-600 font-semibold' : 'app-text-muted',
        ]"
      >
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

const getWalletName = (): string => {
  return t('finance.walletLabel');
};

const isLastInstallment = (installment?: string): boolean => {
  if (!installment) {
    return false;
  }

  const match = installment.match(/^(\d+)\/(\d+)$/);

  if (!match) {
    return false;
  }

  const current = Number(match[1]);
  const total = Number(match[2]);

  return total > 1 && current === total;
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
