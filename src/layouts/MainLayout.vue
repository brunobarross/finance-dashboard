<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader @toggle-drawer="drawer = !drawer" @new-transaction="showTransactionModal = true" />

    <AppDrawer v-model="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppDialog v-model="showTransactionModal" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '../components/ui/AppHeader.vue';
import AppDrawer from '../components/ui/AppDrawer.vue';
import AppDialog from '../components/ui/AppDialog.vue';

const showTransactionModal = ref(false);
const drawer = ref(false);
</script>
