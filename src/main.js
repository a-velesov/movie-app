import Vue from 'vue';
import App from './App.vue';
import store from './../store';
import './plugins/bootstrap';
import router from '@/plugins/router/route';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
