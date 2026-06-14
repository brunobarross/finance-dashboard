import { ref } from 'vue';

export function useApi<T, P extends any[]>(apiCall: (...args: P) => Promise<any>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const execute = async (...args: P): Promise<T> => {
    loading.value = true;
    error.value = null;
    try {
      const res = await apiCall(...args);
      // Handle both wrapped { data: T } and direct T responses
      const result = res && typeof res === 'object' && 'data' in res ? res.data : res;
      data.value = result;
      return result;
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Error';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
