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

    <SkeletonLoader v-if="isLoading" type="wallet-list" />

    <div v-else-if="!wallets?.length" class="p-6 text-center">
      <q-icon name="wallet" size="40px" class="text-gray-300 mb-2" />
      <p class="text-gray-400 text-sm">{{ $t('finance.noWallets') }}</p>
    </div>

    <q-list v-else separator class="rounded-lg overflow-hidden">
      <WalletExpansionItem
        v-for="wallet in wallets"
        :key="wallet.id"
        :wallet="wallet"
        :is-selected="selectedWallet === wallet.id"
        :details="getSelectedWalletData(wallet.id)"
        @show="handleWalletShow(wallet.id)"
        @hide="selectedWallet = null"
        @delete-transaction="handleDeleteTransaction"
        @delete-wallet="handleDeleteWallet"
      />
    </q-list>

    <q-dialog v-model="showModal" position="standard">
      <WalletFormModal @close="showModal = false" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import WalletFormModal from './WalletFormModal.vue';
import WalletExpansionItem from './WalletExpansionItem.vue';
import SkeletonLoader from './SkeletonLoader.vue';
const { wallets, currentMonth, transactions, isLoading } = storeToRefs(useFinanceStore());
const $q = useQuasar();
const { deleteWallet, getWalletTransactions, deleteTransaction } = useFinanceStore();
const { t } = useI18n();
const showModal = ref(false);
const selectedWallet = ref<string | null>(null);
import { Transaction } from 'src/types';
const walletTransactions = ref<Record<string, Transaction[]>>({});
const loadingTransactions = ref<Record<string, boolean>>({});

const handleWalletShow = async (id: string) => {
  selectedWallet.value = id;
  if (walletTransactions.value[id]) return;

  try {
    loadingTransactions.value[id] = true;
    const transactions = await getWalletTransactions(
      id,
      currentMonth.value.month,
      currentMonth.value.year
    );
    walletTransactions.value[id] = transactions;
  } finally {
    loadingTransactions.value[id] = false;
  }
};

const getSelectedWalletData = (id: string) => {
  const wallet = wallets.value.find((w) => w.id === id);
  if (!wallet) return undefined;

  return {
    ...wallet,
    transactions: walletTransactions.value[id] || [],
    isLoading: loadingTransactions.value[id] === true,
  };
};

watch(
  currentMonth,
  () => {
    walletTransactions.value = {};
    if (!selectedWallet.value) return;

    handleWalletShow(selectedWallet.value);
  },
  { deep: true }
);

const handleNewTransaction = (newTransactions: any[], oldTransactions: any[]) => {
  if (newTransactions.length <= oldTransactions.length || !selectedWallet.value) {
    return;
  }

  const newTransaction = newTransactions.find((t) => !oldTransactions.some((ot) => ot.id === t.id));
  if (newTransaction && newTransaction.walletId === selectedWallet.value) {
    walletTransactions.value[selectedWallet.value]?.push(newTransaction);
  }
};

watch(
  transactions,
  (newTransactions, oldTransactions) => handleNewTransaction(newTransactions, oldTransactions),
  { deep: true }
);

const handleDeleteWallet = (id: string) => {
  $q.dialog({
    title: t('actions.deleteWallet'),
    message: t('actions.deleteWalletMessage'),
    cancel: { flat: true, label: t('actions.cancel') },
    ok: { color: 'negative', label: t('actions.delete') },
  }).onOk(async () => {
    try {
      await deleteWallet(id);
      selectedWallet.value = null;
      $q.notify({ type: 'positive', message: t('actions.walletDeleted'), position: 'top' });
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('errors.generic'), position: 'top' });
    }
  });
};

const removeTransactionFromLocalState = (id: string) => {
  if (!selectedWallet.value || !walletTransactions.value[selectedWallet.value]) {
    return;
  }
  walletTransactions.value[selectedWallet.value] = walletTransactions.value[
    selectedWallet.value
  ].filter((t) => t.id !== id);
};

const handleDeleteTransaction = (id: string) => {
  $q.dialog({
    title: t('actions.confirmDelete'),
    message: t('actions.deleteMessage'),
    cancel: { flat: true, label: t('actions.cancel') },
    ok: { color: 'negative', label: t('actions.delete') },
  }).onOk(async () => {
    try {
      await deleteTransaction(id);
      removeTransactionFromLocalState(id);
      $q.notify({ type: 'positive', message: t('actions.transactionDeleted'), position: 'top' });
    } catch (error) {
      console.error(error);
      $q.notify({ type: 'negative', message: t('errors.generic'), position: 'top' });
    }
  });
};
</script>
