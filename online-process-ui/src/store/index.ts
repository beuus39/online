import Vue from 'vue'
import Vuex from 'vuex'
import User from "@/store/modules/User";
import Workflow from "@/store/modules/Workflow"
import DepositInvoice from "@/store/modules/DepositInvoice";

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
    Workflow,
    DepositInvoice
  }
})
