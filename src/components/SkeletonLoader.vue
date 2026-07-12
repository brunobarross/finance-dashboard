<template>
  <div v-if="type === 'wallet-list'" class="p-4 space-y-3">
    <div v-for="i in 3" :key="i" class="flex items-center gap-4">
      <q-skeleton type="QAvatar" size="40px" />
      <div class="flex-grow">
        <q-skeleton type="text" :width="walletSkeletonWidths[i - 1]" />
      </div>
    </div>
  </div>

  <div v-else-if="type === 'transaction-list'" class="space-y-2">
    <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-2">
      <div class="flex items-center flex-grow gap-2">
        <q-skeleton type="text" :width="transactionPrimaryWidths[i - 1]" />
        <q-skeleton type="text" :width="transactionSecondaryWidths[i - 1]" />
      </div>
      <q-skeleton type="text" :width="transactionAmountWidths[i - 1]" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'wallet-list' | 'transaction-list';
}>();

const walletSkeletonWidths = ['34%', '52%', '41%'];
const transactionPrimaryWidths = ['28%', '40%', '33%'];
const transactionSecondaryWidths = ['10%', '14%', '8%'];
const transactionAmountWidths = ['20%', '26%', '18%'];
</script>
