<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    maximized
    transition-show="slide-left"
    transition-hide="slide-right"
    position="right"
  >
    <TransactionFormModal @close="$emit('update:modelValue', false)" />
  </q-dialog>
</template>

<script setup lang="ts">
import TransactionFormModal from 'src/components/TransactionFormModal.vue';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>
