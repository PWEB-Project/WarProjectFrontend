import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: null
  },
  getters: {
  },
  mutations: {
    update_city(state, payload){
      localStorage.setItem("city", payload);
      state.city = payload;
    }
  },
  actions: {
    add_city({commit}, city){
      this.state.city = city;
      commit("update_city", city);
    }
  },
  modules: {
  }
})
