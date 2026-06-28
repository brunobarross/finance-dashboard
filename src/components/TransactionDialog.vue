<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <TransactionFormModal @close="$emit('update:modelValue', false)" />
  </q-dialog>
</template>

<script setup lang="ts">
import TransactionFormModal from 'src/components/TransactionFormModal.vue';

defineProps<{ modelValue: boolean }>();
defineEmits(['update:modelValue']);
</script>
