<template>
  <q-card class="w-full max-w-md mx-auto" style="min-width: 280px; max-width: 95vw">
    <q-card-section class="bg-primary-50 q-pa-md sm:q-pa-md">
      <h3 class="text-base sm:text-lg font-semibold text-gray-800">
        {{ $t('finance.newTransaction') }}
      </h3>
    </q-card-section>

    <q-card-section class="q-pa-md sm:q-pa-md h-full">
      <q-form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4 flex flex-col">
        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >{{ $t('finance.name') }} *</label
          >
          <q-input
            v-model="form.name"
            outlined
            dense
            :placeholder="$t('actions.namePlaceholder')"
            class="w-full"
            :rules="[(val) => !!val || $t('actions.requiredName')]"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >{{ $t('finance.value') }} (R$) *</label
            >
            <q-input
              v-model.number="form.value"
              type="number"
              outlined
              dense
              prefix="R$"
              class="w-full"
              :rules="[(val) => val > 0 || $t('actions.requiredValue')]"
            />
          </div>

          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{{
              $t('finance.installment')
            }}</label>
            <q-input
              v-model="form.installment"
              outlined
              dense
              :placeholder="$t('actions.installmentPlaceholder')"
              class="w-full"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{{
            $t('finance.date')
          }}</label>
          <q-input outlined dense v-model="form.date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >{{ $t('finance.wallet') }} *</label
          >
          <q-select
            v-model="form.walletId"
            :options="walletOptions"
            outlined
            dense
            emit-value
            map-options
            class="w-full"
            :rules="[(val) => !!val || $t('actions.requiredWallet')]"
          />
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{{
            $t('finance.description')
          }}</label>
          <q-input
            v-model="form.description"
            outlined
            dense
            type="textarea"
            rows="2"
            :placeholder="$t('actions.detailsPlaceholder')"
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">{{
            $t('finance.type')
          }}</label>
          <q-btn-toggle
            v-model="form.type"
            toggle-color="primary"
            :options="[
              { label: $t('finance.expense'), value: 'EXPENSE' },
              { label: $t('finance.incomeType'), value: 'INCOME' },
            ]"
            class="w-full"
            rounded
            unelevated
            color="white"
            text-color="grey-8"
            :toggle-text-color="form.type === 'EXPENSE' ? 'white' : 'white'"
          />
        </div>

        <div class="flex justify-end gap-2 pt-2 sm:pt-4 mt-auto">
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
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../stores/finance';
import { useQuasar, date } from 'quasar';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{ close: [] }>();
const { wallets } = storeToRefs(useFinanceStore());
const { addTransaction } = useFinanceStore();
const $q = useQuasar();
const { t } = useI18n();

const form = ref({
  name: '',
  value: 0,
  installment: '',
  walletId: '',
  description: '',
  date: '',
  type: 'EXPENSE' as 'EXPENSE' | 'INCOME',
});

const walletOptions = computed(() => wallets.value.map((w) => ({ label: w.name, value: w.id })));

const handleSubmit = () => {
  addTransaction({
    ...form.value,
    date: date.formatDate(form.value.date, 'YYYY-MM-DD'),
  });
  $q.notify({ type: 'positive', message: t('actions.transactionAdded'), position: 'top' });
  emit('close');
};
</script>
