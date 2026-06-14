import { createApp } from 'vue';
import { Quasar, Notify, Dialog } from 'quasar';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/app.css';

const app = createApp(App);
app.use(Quasar, { plugins: { Notify, Dialog } });
app.use(createPinia());
app.use(router);
app.mount('#q-app');
