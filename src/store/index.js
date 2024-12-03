import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: localStorage.getItem('accessToken') ? true : false, // Verifica se já existe um token no localStorage
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login({ commit }) {
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
  },
});

export default store;
