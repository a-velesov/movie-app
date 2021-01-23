import mutations from '../mutations';

const { SHOW_NOTIFY } = mutations;

const notificationStore = {
  state: {
    messagePool: [],
  },
  getters: {
    getMessagePool: ({ messagePool }) => messagePool[messagePool.length - 1],
  },
  mutations: {
    [SHOW_NOTIFY](state, msg) {
      state.messagePool.push(msg);
    },
  },
  actions: {
    showNotify({ commit }, msg) {
      commit(SHOW_NOTIFY, msg);
    },
  },
};

export default notificationStore;