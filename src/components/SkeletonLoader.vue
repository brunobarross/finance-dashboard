<template>
  <div v-if="type === 'wallet-list'" class="p-4 space-y-3">
    <div v-for="i in 3" :key="i" class="flex items-center gap-4">
      <q-skeleton type="QAvatar" size="40px" />
      <div class="flex-grow">
        <q-skeleton type="text" width="40%" />
        <q-skeleton type="text" width="25%" height="12px" class="mt-1" />
      </div>
      <q-skeleton type="text" width="20%" />
    </div>
  </div>

  <div v-else-if="type === 'transaction-list'" class="space-y-2">
    <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-2">
      <q-skeleton type="QAvatar" size="24px" />
      <div class="flex-grow">
        <q-skeleton type="text" width="60%" />
      </div>
      <q-skeleton type="text" width="25%" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'wallet-list' | 'transaction-list';
}>();
</script>
