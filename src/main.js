import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import './icons' // icon
import './permission' // permission control
import * as filters from './filters' // global filters
import permission from '@/directive/permission/index.js' // 权限判断指令
import Print from '@/utils/print' // 打印

Vue.use(Print)
Vue.use(Element)
Vue.prototype.$api = process.env.BASE_API;
Vue.directive('permission', permission)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
