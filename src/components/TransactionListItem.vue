<template>
  <q-item
    clickable
    v-ripple
    class="py-3 sm:py-4 px-3 sm:px-5 app-interactive-muted relative cursor-pointer"
    @click="handleCopy"
  >
    <q-tooltip class="bg-gray-900/95 text-white p-3 text-xs shadow-xl rounded-lg border border-gray-700/50 backdrop-blur-sm">
      <div class="font-bold text-sm text-gray-100 mb-1 border-b border-gray-700 pb-1">
        {{ transaction.name }}
      </div>
      <div class="space-y-1 text-gray-300">
        <div class="flex items-center gap-1.5">
          <span class="font-medium text-gray-400">{{ $t('finance.type') }}:</span>
          <span :class="transaction.type === 'INCOME' ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'">
            {{ transaction.type === 'INCOME' ? $t('finance.incomeType') : $t('finance.expense') }}
          </span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="font-medium text-gray-400">{{ $t('finance.value') }}:</span>
          <span :class="transaction.type === 'INCOME' ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'">
            {{ transaction.type === 'INCOME' ? '+' : '-' }}{{ formatCurrency(transaction.value) }}
          </span>
        </div>
        <div v-if="formattedDate" class="flex items-center gap-1.5">
          <span class="font-medium text-gray-400">{{ $t('finance.date') }}:</span>
          <span>{{ formattedDate }}</span>
        </div>
        <div v-if="walletName" class="flex items-center gap-1.5">
          <span class="font-medium text-gray-400">{{ $t('finance.wallet') }}:</span>
          <span>{{ walletName }}</span>
        </div>
        <div v-if="transaction.installment" class="flex items-center gap-1.5">
          <span class="font-medium text-gray-400">{{ $t('finance.installment') }}:</span>
          <span>{{ transaction.installment }}</span>
        </div>
        <div v-if="transaction.description" class="flex items-center gap-1.5">
          <span class="font-medium text-gray-400">{{ $t('finance.description') }}:</span>
          <span>{{ transaction.description }}</span>
        </div>
      </div>
    </q-tooltip>

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
      <q-item-label class="font-medium text-app-text text-sm sm:text-base truncate">
        {{ transaction.name }}
      </q-item-label>
      <q-item-label caption class="app-text-muted text-xs sm:text-sm hidden sm:block">
        {{ walletName }} - {{ transaction.description }}
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
import { computed } from 'vue';
import { copyToClipboard, date, useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useFormatters } from 'src/composables';
import { useFinanceStore } from 'src/stores/finance';
import { Transaction } from 'src/types';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ transaction: Transaction }>();

const { formatCurrency } = useFormatters();
const $q = useQuasar();
const financeStore = useFinanceStore();
const { wallets } = storeToRefs(financeStore);
const { deleteTransaction } = financeStore;
const { t } = useI18n();

const wallet = computed(() => wallets.value.find((w) => w.id === props.transaction.walletId));
const walletName = computed(() => wallet.value?.name || t('finance.walletLabel'));

const formattedDate = computed(() => {
  if (!props.transaction.date) return '';
  return date.formatDate(props.transaction.date, 'DD/MM/YYYY');
});

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

const getTransactionFullText = (): string => {
  const parts: string[] = [];
  if (props.transaction.name) parts.push(`${t('finance.name')}: ${props.transaction.name}`);
  parts.push(
    `${t('finance.type')}: ${
      props.transaction.type === 'INCOME' ? t('finance.incomeType') : t('finance.expense')
    }`
  );
  parts.push(
    `${t('finance.value')}: ${
      props.transaction.type === 'INCOME' ? '+' : '-'
    }${formatCurrency(props.transaction.value)}`
  );
  if (formattedDate.value) parts.push(`${t('finance.date')}: ${formattedDate.value}`);
  if (walletName.value) parts.push(`${t('finance.wallet')}: ${walletName.value}`);
  if (props.transaction.installment) parts.push(`${t('finance.installment')}: ${props.transaction.installment}`);
  if (props.transaction.description) parts.push(`${t('finance.description')}: ${props.transaction.description}`);
  return parts.join(' | ');
};

const handleCopy = async () => {
  const textToCopy = getTransactionFullText();
  try {
    await copyToClipboard(textToCopy);
    $q.notify({
      type: 'positive',
      message: t('actions.copiedToClipboard'),
      icon: 'content_copy',
      position: 'top',
      timeout: 2000,
    });
  } catch (err) {
    console.error('Failed to copy transaction:', err);
  }
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

