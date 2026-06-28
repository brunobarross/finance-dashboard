<template>
  <q-header class="bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg text-white">
    <q-toolbar class="max-w-7xl mx-auto px-2 sm:px-4">
      <q-btn flat round icon="menu" class="lg:hidden mr-1" @click="$emit('toggle-drawer')" />

      <q-icon name="account_balance_wallet" size="24px" class="mr-2" />

      <q-toolbar-title class="text-lg sm:text-xl font-bold tracking-tight">
        <span class="hidden sm:inline">Finance Dashboard</span>
        <span class="sm:hidden">Finanças</span>
      </q-toolbar-title>

      <q-btn
        flat
        round
        :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
        @click="$q.dark.toggle()"
        class="hover:bg-primary-700 rounded-full p-2"
      >
        <q-tooltip>{{ $q.dark.isActive ? 'Light Mode' : 'Dark Mode' }}</q-tooltip>
      </q-btn>

      <q-btn
        flat
        round
        icon="add"
        @click="$emit('open-transaction-modal')"
        class="hover:bg-primary-700 rounded-full p-2"
      >
        <q-tooltip>Nova Transação</q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

defineEmits(['toggle-drawer', 'open-transaction-modal']);

const $q = useQuasar();
</script>
