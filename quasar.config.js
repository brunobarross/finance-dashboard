import { defineConfig } from '#q-app/wrappers';

export default defineConfig((ctx) => {
  console.log(ctx);

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
      config: {},
      plugins: ['Notify', 'Dialog'],
    },
    animations: [],
  };
});
