import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/Pages/App/Beranda.vue';
import Login from '@/pages/Auth/Login.vue';
import Paralax from '@/components/Parallax.vue';

import { useStore } from '@/Store/modules';
import {inject} from 'vue'
import { storeToRefs } from 'pinia';

const routes = [
  {
    path: '/',
    name: 'Paralax',
    component: Paralax,
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = inject('store')
  const isLogin = store.authStore.isLogin; 
  if (to.path === '/login' && isLogin) {
    next('/dashboard');
  } 
  else if (to.path !== '/' && to.path !== '/login' && !isLogin) {
    next('/login');
  }

  else {
    next();
  }
});

export default router;
