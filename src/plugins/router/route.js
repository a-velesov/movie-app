import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'root',
    component: App,
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;