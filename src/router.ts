import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../pages/DashboardPage.vue') }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
