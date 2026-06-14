<template>
  <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
    <div class="bg-white rounded-xl shadow-sm p-4 sm:p-5 border-l-4 border-emerald-500">
      <div class="flex items-center justify-between">
        <div class="min-w-0 flex-1">
          <p class="text-xs sm:text-sm text-gray-500 font-medium truncate">{{ $t('finance.income') }}</p>
          <p class="text-lg sm:text-2xl font-bold text-emerald-600 mt-1">
            {{ formatCurrency(totalIncome) }}
          </p>
        </div>
        <div
          class="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
        >
          <q-icon name="trending_up" size="20px sm:24px" class="text-emerald-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 sm:p-5 border-l-4 border-red-500">
      <div class="flex items-center justify-between">
        <div class="min-w-0 flex-1">
          <p class="text-xs sm:text-sm text-gray-500 font-medium truncate">{{ $t('finance.expenses') }}</p>
          <p class="text-lg sm:text-2xl font-bold text-red-600 mt-1">
            {{ formatCurrency(totalExpenses) }}
          </p>
        </div>
        <div
          class="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
        >
          <q-icon name="trending_down" size="20px sm:24px" class="text-red-600" />
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-xl shadow-sm p-4 sm:p-5 border-l-4 border-primary-500 xs:col-span-2 lg:col-span-1"
    >
      <div class="flex items-center justify-between">
        <div class="min-w-0 flex-1">
          <p class="text-xs sm:text-sm text-gray-500 font-medium truncate">{{ $t('finance.balance') }}</p>
          <p
            :class="[
              'text-lg sm:text-2xl font-bold mt-1 truncate',
              balance >= 0 ? 'text-primary-600' : 'text-red-600',
            ]"
          >
            {{ formatCurrency(balance) }}
          </p>
        </div>
        <div
          class="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
        >
          <q-icon name="account_balance_wallet" size="20px sm:24px" class="text-primary-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';
import { useFormatters } from '../composables';

const { totalExpenses, totalIncome, balance } = storeToRefs(useFinanceStore());
const { formatCurrency } = useFormatters();
</script>
