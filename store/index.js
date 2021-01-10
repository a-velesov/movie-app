import Vue from 'vue';
import Vuex from 'vuex';
import moviesStore from './modules/movies';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    moviesStore
  },
});

store.dispatch('initMoviesStore');

export default store;