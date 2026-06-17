<template>
  <q-header class="bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg">
    <q-toolbar class="max-w-7xl mx-auto px-2 sm:px-4">
      <q-btn flat round icon="menu" class="lg:hidden mr-2" @click="$emit('toggle-drawer')" />
      <q-icon name="account_balance_wallet" size="24px" class="mr-2" />
      <q-toolbar-title class="text-lg sm:text-xl font-bold tracking-tight">
        <span class="hidden sm:inline">{{ $t('app.title') }}</span>
        <span class="sm:hidden">{{ $t('app.shortTitle') }}</span>
      </q-toolbar-title>

      <div class="flex items-center gap-1 sm:gap-2">
        <div v-if="userName" class="text-white text-sm font-medium mr-2 hidden sm:block">
          {{ userName }}
        </div>
        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          borderless
          emit-value
          map-options
          options-dense
          class="bg-white/10 rounded-lg px-2 text-white"
          popup-content-class="bg-white"
          dark
        >
          <template v-slot:selected-item="scope">
            <span class="text-white text-xs font-medium uppercase">{{ scope.opt.value.split('-')[0] }}</span>
          </template>
        </q-select>

        <q-btn
          flat
          round
          icon="add"
          @click="$emit('new-transaction')"
          class="hover:bg-primary-700 rounded-full p-2"
        >
          <q-tooltip>{{ $t('finance.newTransaction') }}</q-tooltip>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../stores/user';

const { locale } = useI18n();
const { userName } = storeToRefs(useUserStore());

const localeOptions = [
  { label: 'English', value: 'en-US' },
  { label: 'Português (BR)', value: 'pt-BR' },
  { label: 'Português (PT)', value: 'pt-PT' },
  { label: 'Español', value: 'es-ES' },
];

defineEmits<{
  'toggle-drawer': [];
  'new-transaction': [];
}>();
</script>
