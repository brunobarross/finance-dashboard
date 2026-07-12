<template>
  <q-item dense class="app-surface-muted rounded-lg py-2">
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
        <q-tooltip>{{ transaction.name }}</q-tooltip>
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
import { useFormatters } from 'src/composables';
import { Transaction } from 'src/types';
import { computed } from 'vue';
import { date } from 'quasar';
const { formatCurrency } = useFormatters();

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

const dateFormatted = computed(() => date.formatDate(props.transaction.date, 'DD/MM/YYYY'));
</script>
