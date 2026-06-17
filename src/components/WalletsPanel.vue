<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <div
      class="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between"
    >
      <h3 class="text-base sm:text-lg font-semibold text-gray-800">{{ $t('finance.wallets') }}</h3>
      <q-btn
        flat
        round
        icon="add"
        size="sm"
        @click="showModal = true"
        class="hover:bg-gray-100 touch-manipulation"
      />
    </div>

    <div v-if="!wallets?.length" class="p-6 text-center">
      <q-icon name="wallet" size="40px" class="text-gray-300 mb-2" />
      <p class="text-gray-400 text-sm">{{ $t('finance.noWallets') }}</p>
    </div>

    <q-list separator class="rounded-lg overflow-hidden">
      <q-expansion-item
        v-for="wallet in wallets"
        :key="wallet.id"
        group="wallets"
        :header-class="[
          'py-3 sm:py-4 px-3 sm:px-5 hover:bg-gray-50 transition-colors',
          selectedWallet === wallet.id ? 'bg-gray-50' : '',
        ]"
        @show="handleWalletShow(wallet.id)"
        @hide="selectedWallet = null"
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
          <WalletDetails :wallet="getSelectedWalletData(wallet.id)" />
          <q-btn
            flat
            color="negative"
            size="sm"
            icon="delete"
            label="Excluir carteira"
            class="mt-2 w-full py-2"
            @click.stop="handleDeleteWallet(wallet.id)"
          />
        </div>
      </q-expansion-item>
    </q-list>

    <q-dialog v-model="showModal" position="standard">
      <WalletFormModal @close="showModal = false" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';
import { useFormatters } from '../composables';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import WalletDetails from './WalletDetails.vue';
import WalletFormModal from './WalletFormModal.vue';

const { wallets, currentMonth } = storeToRefs(useFinanceStore());
const $q = useQuasar();
const { deleteWallet, getWalletTransactions } = useFinanceStore();
const { t } = useI18n();
const showModal = ref(false);
const selectedWallet = ref<string | null>(null);
const walletTransactions = ref<Record<string, any[]>>({});

const handleWalletShow = async (id: string) => {
  selectedWallet.value = id;
  if (walletTransactions.value[id]) return;

  const transactions = await getWalletTransactions(
    id,
    currentMonth.value.month,
    currentMonth.value.year
  );
  walletTransactions.value[id] = transactions;
};

const getSelectedWalletData = (id: string) => {
  const wallet = wallets.value.find((w) => w.id === id);
  if (!wallet) return undefined;

  return {
    ...wallet,
    transactions: walletTransactions.value[id] || [],
  };
};

import { watch } from 'vue';
watch(
  currentMonth,
  () => {
    walletTransactions.value = {};
    if (!selectedWallet.value) return;

    handleWalletShow(selectedWallet.value);
  },
  { deep: true }
);

const handleDeleteWallet = (id: string) => {
  $q.dialog({
    title: t('actions.deleteWallet'),
    message: t('actions.deleteWalletMessage'),
    cancel: { flat: true, label: t('actions.cancel') },
    ok: { color: 'negative', label: t('actions.delete') },
  }).onOk(() => {
    deleteWallet(id);
    selectedWallet.value = null;
    $q.notify({ type: 'positive', message: t('actions.walletDeleted'), position: 'top' });
  });
};
</script>
