import Vue from 'vue';
import Vuex from 'vuex';
import moviesStore from './modules/movies';
import loaderStore from './modules/loader';
import notificationStore from './modules/notification';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    moviesStore,
    loaderStore,
    notificationStore
  },
});

store.dispatch('initMoviesStore');

export default store;