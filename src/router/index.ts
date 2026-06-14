import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/DashboardPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/SimpleLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../pages/LoginPage.vue'),
        meta: { guestOnly: true },
      },
      {
        path: ':catchAll(.*)*',
        component: () => import('../pages/ErrorNotFound.vue'),
      },
    ],
  },
];

export default route(function () {
  const router = createRouter({
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  router.beforeEach((to, from, next) => {
    // Check for access token in Cookies using js-cookie
    const isAuthenticated = !!Cookies.get('accessToken');

    if (to.meta.requiresAuth && !isAuthenticated) {
      // Redirect to login if route requires auth and user is not authenticated
      next({ path: '/login' });
      return;
    }

    if (to.meta.guestOnly && isAuthenticated) {
      // Redirect to dashboard if route is for guests only and user is authenticated
      next({ path: '/' });
      return;
    }

    // Proceed as normal
    next();
  });

  return router;
});
