<template>
  <q-page class="flex flex-center bg-gray-100">
    <q-card class="w-full max-w-md shadow-lg rounded-xl overflow-hidden">
      <q-card-section class="bg-primary text-white py-6 text-center">
        <div class="text-h5 font-bold uppercase tracking-wider">{{ $t('auth.welcome') }}</div>
        <div class="text-subtitle2 opacity-80">{{ $t('auth.subtitle') }}</div>
      </q-card-section>

      <q-card-section class="p-6 sm:p-8">
        <q-form @submit.prevent="onSubmit" class="space-y-6">
          <q-input
            v-model="username"
            :label="$t('auth.username')"
            outlined
            bg-color="white"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || $t('auth.usernameRequired')]"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="person" class="text-gray-400" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            :label="$t('auth.password')"
            type="password"
            outlined
            bg-color="white"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || $t('auth.passwordRequired')]"
            :disable="loading"
          >
            <template v-slot:prepend>
              <q-icon name="lock" class="text-gray-400" />
            </template>
          </q-input>

          <div v-if="error" class="text-red-600 text-sm text-center font-medium">
            {{ error }}
          </div>

          <div class="pt-2">
            <q-btn
              :label="$t('auth.signIn')"
              type="submit"
              color="primary"
              class="w-full py-3 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              size="lg"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center pb-6">
        <div class="text-gray-500 text-sm">
          {{ $t('auth.noAccount') }}
          <a href="#" class="text-primary font-semibold hover:underline">{{ $t('auth.signUp') }}</a>
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
    });
  }
};
</script>

<style scoped>
.q-card {
  border: none;
}
</style>
