import { defineConfig } from '#q-app/wrappers';

export default defineConfig(() => {
  return {
    boot: ['axios', 'i18n'],
    css: ['app.css'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20',
      },
      vueRouterMode: 'history',
    },
    devServer: {
      open: false,
    },
    framework: {
      config: {
        brand: {
          primary: '#2563eb',
          secondary: '#475569',
          accent: '#38bdf8',
          positive: '#059669',
          negative: '#dc2626',
          info: '#0ea5e9',
          warning: '#f59e0b',
          dark: '#0f172a',
        },
      },
      plugins: ['Notify', 'Dialog'],
    },
    animations: [],
  };
});
