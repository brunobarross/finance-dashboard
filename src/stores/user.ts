import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';
import { authService } from '../services/authService';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const userId = computed(() => user.value?.id);
  const userName = computed(() => user.value?.name);

  const fetchUser = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      user.value = await authService.getMe();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user';
      console.error('Error fetching user:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    userId,
    userName,
    isLoading,
    error,
    fetchUser,
  };
});
