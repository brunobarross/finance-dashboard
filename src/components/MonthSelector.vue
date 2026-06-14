<template>
  <div
    class="flex items-center justify-between bg-white rounded-xl shadow-sm px-3 sm:px-6 py-3 sm:py-4"
  >
    <button
      @click="prevMonth"
      class="p-2 w-10 h-10 hover:bg-gray-100 rounded-full transition-colors touch-manipulation grid place-items-center border-none"
    >
      <q-icon name="chevron_left" size="20px sm:24px" />
    </button>

    <h2 class="text-base sm:text-lg font-semibold text-gray-800 min-w-36 sm:min-w-48 text-center">
      {{ monthLabel }}
    </h2>

    <button
      @click="nextMonth"
      class="p-2 w-10 h-10 grid place-items-center hover:bg-gray-100 rounded-full transition-colors touch-manipulation border-none"
    >
      <q-icon name="chevron_right" size="20px sm:24px" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';

const { monthLabel } = storeToRefs(useFinanceStore());
const { nextMonth, prevMonth } = useFinanceStore();
</script>
