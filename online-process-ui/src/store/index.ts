import Vue from 'vue'
import Vuex from 'vuex'
import User from "@/store/modules/User";
import Workflow from "@/store/modules/Workflow"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User,
    Workflow
  }
})
