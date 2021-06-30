import Vue from 'vue'
import Antd from "ant-design-vue"
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "ant-design-vue/dist/antd.css"
import {DatePicker} from "ant-design-vue";

Vue.use(DatePicker)
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
