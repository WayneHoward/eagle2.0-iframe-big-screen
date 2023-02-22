import Vue from 'vue'
// 引入dataV
import DataV from '@jiaminghi/data-view'
import countTo from '@/components/count-to/index'

Vue.use(DataV)
Vue.use(countTo)/* 使用自定义的公共组件 */
Vue.component('count-to', countTo)/* 初始化公共组件 */
