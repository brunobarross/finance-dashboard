import { Dark } from 'quasar';
import { ref } from 'vue';

const THEME_STORAGE_KEY = 'finance-dashboard-theme';
const isDark = ref(false);
let isInitialized = false;

const getStoredTheme = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'dark') {
    return true;
  }

  if (storedTheme === 'light') {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const persistTheme = (dark: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
};

const syncDocumentTheme = (dark: boolean) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', dark);
};

const applyTheme = (dark: boolean) => {
  isDark.value = dark;
  Dark.set(dark);
  syncDocumentTheme(dark);
  persistTheme(dark);
};

export const initializeTheme = () => {
  if (isInitialized) {
    return;
  }

  isInitialized = true;
  applyTheme(getStoredTheme());
};

export function useTheme() {
  initializeTheme();

  return {
    isDark,
    setTheme: applyTheme,
    toggleTheme: () => applyTheme(!isDark.value),
  };
}
