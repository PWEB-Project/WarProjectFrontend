import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: null,
    role: null
  },
  getters: {
  },
  mutations: {
    update_city(state, payload){
      localStorage.setItem("city", payload);
      state.city = payload;
    },
    update_role(state, payload){
      localStorage.setItem("role", payload);
      state.role = payload;
    }
  },
  actions: {
    add_city({commit}, city){
      this.state.city = city;
      commit("update_city", city);
    },
    add_role({commit}, role){
      this.state.role = role;
      commit("update_role", role);
    }
  },
  modules: {
  }
})
