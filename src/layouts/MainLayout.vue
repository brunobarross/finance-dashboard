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
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import AppHeader from '../components/ui/AppHeader.vue';
import AppDrawer from '../components/ui/AppDrawer.vue';
import AppDialog from '../components/ui/AppDialog.vue';

const { fetchUser } = useUserStore();
const showTransactionModal = ref(false);
const drawer = ref(false);

onMounted(() => {
  fetchUser();
});
</script>
