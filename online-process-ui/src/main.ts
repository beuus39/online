import Vue from 'vue'
import Antd from "ant-design-vue"
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "ant-design-vue/dist/antd.css"
import {DatePicker} from "ant-design-vue"
import {BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "bootstrap/dist/css/bootstrap.css"
import vuetify from './plugins/vuetify'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(DatePicker)
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
