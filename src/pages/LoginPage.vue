<template>
  <q-page class="flex flex-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
    <q-card class="w-full max-w-md shadow-2xl rounded-2xl overflow-hidden transition-all duration-500">
      <q-card-section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-8 text-center relative">
        <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <q-icon name="account_balance_wallet" size="150px" class="absolute -top-10 -right-10 rotate-12" />
        </div>
        <div class="text-h4 font-bold tracking-tight mb-1">{{ $t('auth.welcome') }}</div>
        <div class="text-subtitle1 opacity-90">{{ $t('auth.subtitle') }}</div>
      </q-card-section>

      <q-card-section class="p-6 sm:p-10 bg-white">
        <q-form @submit.prevent="onSubmit" class="space-y-5">
          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              {{ $t('auth.username') }}
            </label>
            <q-input
              v-model="username"
              outlined
              dense
              bg-color="gray-50"
              color="primary"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || $t('auth.usernameRequired')]"
              :disable="loading"
              class="rounded-lg transition-shadow hover:shadow-sm"
            >
              <template v-slot:prepend>
                <q-icon name="person" class="text-primary-400" size="20px" />
              </template>
            </q-input>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              {{ $t('auth.password') }}
            </label>
            <q-input
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              outlined
              dense
              bg-color="gray-50"
              color="primary"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || $t('auth.passwordRequired')]"
              :disable="loading"
              class="rounded-lg transition-shadow hover:shadow-sm"
            >
              <template v-slot:prepend>
                <q-icon name="lock" class="text-primary-400" size="20px" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer text-gray-400 hover:text-primary transition-colors"
                  @click="isPasswordVisible = !isPasswordVisible"
                  size="20px"
                />
              </template>
            </q-input>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg text-center font-medium animate-shake">
            {{ error }}
          </div>

          <div class="pt-4">
            <q-btn
              :label="$t('auth.signIn')"
              type="submit"
              color="primary"
              unelevated
              class="w-full py-3 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95"
              size="lg"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center pb-8 bg-white">
        <div class="text-gray-500 text-sm">
          {{ $t('auth.noAccount') }}
          <button class="text-primary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer transition-colors">
            {{ $t('auth.signUp') }}
          </button>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import Cookies from 'js-cookie';
import { useAuthApi, useApi } from 'src/composables';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { LoginResponse } from 'src/types';
import { useFinanceStore } from 'src/stores/finance';

const { login } = useAuthApi();
const { loading, error, execute } = useApi<LoginResponse, any[]>(login);
const $q = useQuasar();
const router = useRouter();
const financeStore = useFinanceStore();

const username = ref('');
const password = ref('');
const isPasswordVisible = ref(false);

const onSubmit = async () => {
  try {
    const response = await execute({
      username: username.value,
      password: password.value,
    });

    if (!response?.accessToken) throw new Error();
    
    financeStore.user = response.user;
    
    Cookies.set('accessToken', response.accessToken, {
      secure: true,
      sameSite: 'strict',
      expires: 3,
    });
    router.push('/');
  } catch (err: any) {
    $q.notify({
      type: 'negative',
      message: error.value || 'Erro ao realizar login',
      position: 'top',
      classes: 'rounded-xl shadow-lg'
    });
  }
};
</script>

<style scoped>
.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px;
}

:deep(.q-field--outlined.q-field--focused .q-field__control) {
  box-shadow: 0 0 0 2px rgba(var(--q-primary), 0.1);
}
</style>
