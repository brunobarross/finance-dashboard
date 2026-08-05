<template>
  <q-item clickable v-ripple dense class="app-surface-muted rounded-lg py-2 cursor-pointer relative" @click="handleCopy">
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
        <div v-if="dateFormatted" class="flex items-center gap-1.5">
          <span class="font-medium text-gray-400">{{ $t('finance.date') }}:</span>
          <span>{{ dateFormatted }}</span>
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

    <q-item-section avatar class="min-w-0 pr-2">
      <div
        :class="[
          'w-2 h-2 rounded-full',
          transaction.type === 'INCOME' ? 'bg-emerald-500' : 'bg-red-500',
        ]"
      ></div>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-xs sm:text-sm text-app-text" lines="1">
        {{ transaction.name }} -
        <span class="text-xs font-medium app-text-muted">{{ dateFormatted }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label
        :class="[
          'text-xs sm:text-sm font-medium',
          transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600',
        ]"
      >
        {{ transaction.type === 'INCOME' ? '+' : '-' }}{{ formatCurrency(transaction.value) }}
        <span
          v-if="transactionInstallment"
          :class="isLastInstallment ? 'text-amber-600 font-semibold' : ''"
        >
          {{ transactionInstallment }}
        </span>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn
        flat
        round
        dense
        color="negative"
        icon="delete"
        size="sm"
        @click.stop="emit('delete', transaction.id)"
      />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { copyToClipboard, date, useQuasar } from 'quasar';
import { useFormatters } from 'src/composables';
import { Transaction } from 'src/types';
import { useI18n } from 'vue-i18n';

const { formatCurrency } = useFormatters();
const $q = useQuasar();
const { t } = useI18n();

const props = defineProps<{ transaction: Transaction }>();
const emit = defineEmits<{ (e: 'delete', id: string): void }>();

const transactionInstallment = computed(() =>
  props.transaction.installment?.length ? `(${props.transaction.installment})` : null
);

const isLastInstallment = computed(() => {
  const installment = props.transaction.installment;

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
});

const dateFormatted = computed(() =>
  props.transaction.date ? date.formatDate(props.transaction.date, 'DD/MM/YYYY') : ''
);

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
  if (dateFormatted.value) parts.push(`${t('finance.date')}: ${dateFormatted.value}`);
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
</script>
