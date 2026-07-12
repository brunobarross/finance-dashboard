<template>
  <div
    class="app-surface flex items-center justify-between rounded-xl px-3 sm:px-6 py-3 sm:py-4"
  >
    <q-btn
      flat
      round
      dense
      icon="chevron_left"
      @click="prevMonth"
      class="app-interactive-muted w-10 h-10 touch-manipulation"
    />

    <h2 class="text-base sm:text-lg font-semibold text-app-text min-w-36 sm:min-w-48 text-center">
      {{ monthLabel }}
    </h2>

    <q-btn
      flat
      round
      dense
      icon="chevron_right"
      @click="nextMonth"
      class="app-interactive-muted w-10 h-10 touch-manipulation"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';

const { monthLabel } = storeToRefs(useFinanceStore());
const { nextMonth, prevMonth } = useFinanceStore();
</script>
