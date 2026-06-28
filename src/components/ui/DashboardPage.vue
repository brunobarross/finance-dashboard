<template>
  <q-layout view="hHh lpR fFf">
    <DashboardHeader
      @toggle-drawer="leftDrawerOpen = !leftDrawerOpen"
      @open-transaction-modal="transactionModalOpen = true"
    />

    <DashboardDrawer v-model="leftDrawerOpen" />

    <q-page-container>
      <q-page class="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
          <MonthSelector />
          <SummaryCards />
          <div class="block lg:hidden">
            <WalletsPanelMobile />
          </div>
          <div class="hidden lg:block">
            <TransactionsList />
          </div>
        </div>
      </q-page>
    </q-page-container>

    <TransactionDialog v-model="transactionModalOpen" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MonthSelector from 'src/components/MonthSelector.vue';
import SummaryCards from 'src/components/SummaryCards.vue';
import TransactionsList from 'src/components/TransactionsList.vue';
import WalletsPanel from 'src/components/WalletsPanel.vue';
import WalletsPanelMobile from 'src/components/WalletsPanelMobile.vue';
import DashboardHeader from 'src/components/ui/DashboardHeader.vue';
import DashboardDrawer from 'src/components/ui/DashboardDrawer.vue';
import TransactionDialog from 'src/components/ui/TransactionDialog.vue';

const transactionModalOpen = ref(false);
const leftDrawerOpen = ref(false);
</script>
