/*
 * @Description: store 入口
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 批量导入modules
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {
  },
  modules,
  plugins: [createPersistedState(
    {
      /* storage: window.sessionStorage,*/
      reducer(val) {
        return {
          // 只储存state中的assessmentData
          // chart: val.example
        }
      }
    })]

})
