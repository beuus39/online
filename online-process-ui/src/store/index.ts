import Vue from 'vue'
import Vuex from 'vuex'
import User from "@/store/modules/User";
import Workflow from "@/store/modules/Workflow"
import Workflow2 from "@/store/modules/Workflow.2"
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
    DepositInvoice,
    Workflow2
  }
})
