<template>
  <q-item
    clickable
    dense
    class="rounded-lg bg-gray-50 py-2"
    @click.stop="$emit('delete', transaction.id)"
  >
    <q-item-section avatar class="min-w-0 pr-2">
      <div
        :class="[
          'w-2 h-2 rounded-full',
          transaction.type === 'INCOME' ? 'bg-emerald-500' : 'bg-red-500',
        ]"
      ></div>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-xs sm:text-sm text-gray-700" lines="1">
        {{ transaction.name }} -
        <span class="text-xs font-medium text-gray-500">{{ dateFormatted }}</span>
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
        <span v-if="transactionInstallment">{{ transactionInstallment }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn flat round dense color="negative" icon="delete" size="sm" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useFormatters } from 'src/composables';
import { Transaction } from 'src/types';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { date } from 'quasar';
const { formatCurrency } = useFormatters();
const { t } = useI18n();

const props = defineProps<{ transaction: Transaction }>();
const emit = defineEmits<{ (e: 'delete', id: string): void }>();

const transactionInstallment = computed(() =>
  props.transaction.installment?.length ? `(${props.transaction.installment})` : null
);

const dateFormatted = computed(() => date.formatDate(props.transaction.date, 'DD/MM/YYYY'));
</script>
