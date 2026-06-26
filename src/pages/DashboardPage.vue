<template>
  <q-page class="bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <MonthSelector />
      <SummaryCards />
      <WalletsPanel />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MonthSelector from '../components/MonthSelector.vue';
import SummaryCards from '../components/SummaryCards.vue';
import WalletsPanel from '../components/WalletsPanel.vue';
</script>
