<template>
  <div class="flex items-center justify-between py-2 sm:py-2.5 px-2 sm:px-3 bg-gray-50 rounded-lg">
    <div class="flex items-center gap-2 sm:gap-3 min-w-0">
      <div
        :class="[
          'w-2 h-2 rounded-full flex-shrink-0',
          transaction.type === 'INCOME' ? 'bg-emerald-500' : 'bg-red-500',
        ]"
      />
      <span class="text-xs sm:text-sm text-gray-700 truncate">{{ transaction.name }} </span>
    </div>
    <span
      :class="[
        'text-xs sm:text-sm font-medium flex-shrink-0 ml-2',
        transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600',
      ]"
    >
      {{ transaction.type === 'INCOME' ? '+' : '-' }}{{ formatCurrency(transaction.value) }}
      {{ transactionInstallment }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useFormatters } from 'src/composables';
import { Transaction } from 'src/types';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { formatCurrency } = useFormatters();
const { t } = useI18n();

const props = defineProps<{ transaction: Transaction }>();

const transactionInstallment = computed(() =>
  props.transaction.installment ? `(${props.transaction.installment})` : null
);
</script>
