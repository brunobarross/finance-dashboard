<template>
  <q-expansion-item
    group="wallets"
    :header-class="[
      'py-3 sm:py-4 px-3 sm:px-5 app-interactive-muted',
      isSelected ? 'bg-app-surface-muted' : '',
    ]"
    @show="$emit('show', wallet.id)"
    @hide="$emit('hide')"
    expand-icon-class="text-app-text-muted"
  >
    <template v-slot:header>
      <q-item-section avatar class="min-w-0">
        <div
          class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: wallet.color }"
        >
          <q-icon :name="wallet.icon" class="text-white" size="18px sm:20px" />
        </div>
      </q-item-section>

      <q-item-section class="min-w-0">
        <q-item-label class="font-medium text-app-text text-sm sm:text-base truncate">
          {{ wallet.name }}
        </q-item-label>
        <q-skeleton
          v-if="wallet.amount === undefined || wallet.amount === null || isLoading"
          type="text"
          width="75px"
          height="18px"
          class="mt-1"
        />
        <q-item-label
          v-else
          :class="[
            'text-xs sm:text-sm font-semibold mt-1',
            wallet.amount >= 0 ? 'text-emerald-600' : 'text-red-600',
          ]"
        >
          {{ formatCurrency(wallet.amount) }}
        </q-item-label>
      </q-item-section>
    </template>

    <div class="app-surface-muted p-3 sm:p-4 mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-lg">
      <WalletDetails :wallet="details" @delete-transaction="$emit('delete-transaction', $event)" />
      <q-btn
        flat
        color="negative"
        size="sm"
        icon="delete"
        :label="$t('actions.deleteWallet')"
        class="mt-2 w-full py-2"
        @click.stop="$emit('delete-wallet', wallet.id)"
      />
    </div>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { WalletDTO } from 'src/types/api';
import WalletDetails from './WalletDetails.vue';
import { Transaction } from 'src/types';
import { useFormatters } from 'src/composables';

interface WalletSummary {
  id: string;
  name: string;
  color: string;
  icon: string;
  transactions: Transaction[];
  isLoading: boolean;
}

const props = withDefaults(
  defineProps<{
    wallet: WalletDTO;
    isSelected: boolean;
    details?: WalletSummary;
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  }
);

const { formatCurrency } = useFormatters();

defineEmits<{
  (e: 'show', id: string): void;
  (e: 'hide'): void;
  (e: 'delete-transaction', id: string): void;
  (e: 'delete-wallet', id: string): void;
}>();
</script>
