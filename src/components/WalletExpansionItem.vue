<template>
  <q-expansion-item
    group="wallets"
    :header-class="[
      'py-3 sm:py-4 px-3 sm:px-5 hover:bg-gray-50 transition-colors',
      isSelected ? 'bg-gray-50' : '',
    ]"
    @show="$emit('show', wallet.id)"
    @hide="$emit('hide')"
    expand-icon-class="text-gray-400"
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
        <q-item-label class="font-medium text-gray-800 text-sm sm:text-base truncate">
          {{ wallet.name }}
        </q-item-label>
      </q-item-section>
    </template>

    <div class="bg-gray-50 p-3 sm:p-4 mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-lg">
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

interface WalletSummary {
  id: string;
  name: string;
  color: string;
  icon: string;
  transactions: Transaction[];
  isLoading: boolean;
}

defineProps<{
  wallet: WalletDTO;
  isSelected: boolean;
  details?: WalletSummary;
}>();

defineEmits<{
  (e: 'show', id: string): void;
  (e: 'hide'): void;
  (e: 'delete-transaction', id: string): void;
  (e: 'delete-wallet', id: string): void;
}>();
</script>
