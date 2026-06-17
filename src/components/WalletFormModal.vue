<template>
  <q-card class="w-full max-w-md mx-auto" style="min-width: 280px; max-width: 95vw">
    <q-card-section class="bg-primary-50 q-pa-md sm:q-pa-md">
      <h3 class="text-base sm:text-lg font-semibold text-gray-800">
        {{ $t('finance.newWallet') }}
      </h3>
    </q-card-section>

    <q-card-section class="q-pa-md sm:q-pa-md">
      <q-form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >{{ $t('finance.name') }} *</label
          >
          <q-input
            v-model="form.name"
            outlined
            dense
            :placeholder="$t('actions.walletPlaceholder')"
            class="w-full"
            :rules="[(val) => !!val || $t('actions.requiredName')]"
          />
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">{{
            $t('finance.icon')
          }}</label>
          <q-select
            v-model="form.icon"
            :options="iconOptions"
            outlined
            dense
            emit-value
            map-options
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">{{
            $t('finance.color')
          }}</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="color in colorOptions"
              :key="color"
              type="button"
              :style="{ backgroundColor: color }"
              :class="[
                'w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-transform hover:scale-110 touch-manipulation',
                form.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : '',
              ]"
              @click="form.color = color"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2 sm:pt-4">
          <q-btn
            flat
            :label="$t('actions.cancel')"
            @click="$emit('close')"
            class="touch-manipulation"
          />
          <q-btn
            color="primary"
            :label="$t('actions.save')"
            type="submit"
            class="touch-manipulation"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFinanceStore } from '../stores/finance';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{ close: [] }>();
const { addWallet } = useFinanceStore();
const $q = useQuasar();
const { t } = useI18n();

const form = ref({
  name: '',
  icon: 'account_balance_wallet',
  color: '#3b82f6',
});

const iconOptions = computed(() => [
  { label: t('finance.walletLabel'), value: 'account_balance_wallet' },
  { label: t('finance.cardLabel'), value: 'credit_card' },
  { label: t('finance.bankLabel'), value: 'account_balance' },
  { label: t('finance.paymentsLabel'), value: 'payments' },
  { label: t('finance.savingsLabel'), value: 'savings' },
]);

const colorOptions = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#64748b',
];

const handleSubmit = () => {
  addWallet({
    ...form.value,
  });
  $q.notify({ type: 'positive', message: t('actions.walletCreated'), position: 'top' });
  emit('close');
};
</script>
