import Vue from 'vue'
import App from './App.vue'
// import router from '@/router'
// import store from '@/store'

import '@/style/index.scss'
// import '@/utils/rem'

import '../lib/rem'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

import dfview from 'dfview'

Vue.use(dfview)

Vue.config.productionTip = false

// 加载公共指令
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key])
      })
    })
  })(require.context('../directives', true, /^\.\/.*\.js$/))
})

new Vue({
  el: '#app',
  // router,
  // store,
  render: h => h(App)
})
