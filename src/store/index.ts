import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== "production";
const debug = false;

const store: StoreOptions<any> = {
  state: {
    started: false,
  },
  getters: {
    started: (state) => state.started,
  },
  mutations: {
    setStarted: (state, started) => {
      state.started = started;
    },
  },
  modules: {},
  strict: debug,
};

export default new Vuex.Store<any>(store);
