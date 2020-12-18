import { createStore } from 'vuex';

let state = {
  counter: 0
}

export default createStore({
  state,
  mutations: {
    increment(state, payload) {
        console.log(payload);
        state.counter += 10;
    }
  },
  getters: {
    getCounter(state, getters, rootState, rootGetters) {
      console.log(getters, rootState, rootGetters);
      return state.counter;
    },
    normalizeCounter(_state, getters) {
      const counter = getters.getCounter;
      if (counter === 0)
        return 0;
      else if (counter > 100)
        return 100;
      return counter;
    }
  },
  // It is always better to go with actions while changing state
  actions: {
    increment(context, payload) {
      // setTimeout(() => {
        console.log(payload);
        context.commit('increment', payload);
      // }, 2000)
    }
  }
})
