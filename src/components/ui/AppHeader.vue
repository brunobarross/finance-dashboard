<template>
  <q-header class="app-header-gradient text-white shadow-lg transition-colors duration-300 h-16">
    <q-toolbar class="max-w-7xl mx-auto px-2 sm:px-4 min-h-16 h-16">
      <q-btn
        flat
        round
        icon="menu"
        class="lg:hidden mr-2 rounded-full hover:bg-white/10"
        @click="$emit('toggle-drawer')"
      />
      <q-icon name="account_balance_wallet" size="24px" class="mr-2" />
      <q-toolbar-title class="text-lg sm:text-xl font-bold tracking-tight">
        <span class="hidden sm:inline">{{ $t('app.title') }}</span>
        <span class="sm:hidden">{{ $t('app.shortTitle') }}</span>
      </q-toolbar-title>

      <div class="flex items-center gap-1 sm:gap-2">
        <q-btn flat round class="rounded-full p-1 hover:bg-white/10">
          <q-avatar color="white" text-color="primary" size="36px" class="text-xs font-bold">
            {{ userInitials }}
          </q-avatar>

          <q-menu
            anchor="bottom right"
            self="top right"
            class="app-surface rounded-2xl shadow-xl min-w-[260px] overflow-hidden"
          >
            <div class="app-surface-muted border-b app-border px-4 py-3">
              <div class="text-sm font-semibold text-app-text">
                {{ userName || $t('app.title') }}
              </div>
              <div class="text-xs app-text-muted mt-1">
                {{ currentLocaleLabel }}
              </div>
            </div>

            <div class="px-4 py-4 space-y-4">
              <div>
                <div class="text-xs font-semibold uppercase tracking-wide app-text-muted mb-2">
                  {{ $t('app.language') }}
                </div>
                <q-select
                  v-model="locale"
                  :options="localeOptions"
                  dense
                  outlined
                  emit-value
                  map-options
                  options-dense
                  class="rounded-xl"
                  popup-content-class="app-surface text-app-text"
                />
              </div>

              <div class="flex items-center justify-between gap-3">
                <div>
                  <div class="text-sm font-medium text-app-text">{{ themeLabel }}</div>
                  <div class="text-xs app-text-muted">
                    {{ isDark ? $t('app.darkMode') : $t('app.lightMode') }}
                  </div>
                </div>

                <q-toggle
                  :model-value="isDark"
                  @update:model-value="setTheme"
                  checked-icon="dark_mode"
                  unchecked-icon="light_mode"
                  keep-color
                  color="amber"
                  dense
                />
              </div>
            </div>

            <div class="border-t app-border p-2">
              <q-item
                clickable
                v-close-popup
                @click="handleLogout"
                class="rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <q-item-section avatar class="min-w-0 pr-3">
                  <q-icon name="logout" size="20px" />
                </q-item-section>
                <q-item-section class="font-medium text-sm">
                  {{ $t('auth.logout') }}
                </q-item-section>
              </q-item>
            </div>
          </q-menu>
        </q-btn>

        <q-btn
          flat
          round
          icon="add"
          :disable="!wallets.length"
          @click="$emit('new-transaction')"
          class="hover:bg-primary-700 rounded-full p-2"
        >
          <q-tooltip>{{ wallets.length ? $t('finance.newTransaction') : $t('finance.noWallets') }}</q-tooltip>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { useFinanceStore } from '../../stores/finance';
import { useTheme } from '../../composables/useTheme';

const { locale, t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const { userName } = storeToRefs(userStore);
const { wallets } = storeToRefs(useFinanceStore());
const { isDark, setTheme } = useTheme();

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};

const themeLabel = computed(() => (isDark.value ? t('app.darkMode') : t('app.lightMode')));
const userInitials = computed(() => {
  if (!userName.value) {
    return 'FD';
  }

  return userName.value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
});
const currentLocaleLabel = computed(
  () => localeOptions.find((option) => option.value === locale.value)?.label || locale.value
);

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
