<template>
  <q-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :width="280"
    :breakpoint="1024"
    bordered
    class="bg-white"
  >
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">{{ $t('finance.wallets') }}</h3>
    </div>
    <WalletsPanel />
  </q-drawer>
</template>

<script setup lang="ts">
import WalletsPanel from 'src/components/WalletsPanel.vue';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>
