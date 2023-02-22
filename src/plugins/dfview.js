import Vue from 'vue'
import dfview from 'dfview'
import 'dfview/lib/dfview.css'
import 'dfview/lib/index.css'
import request from '@/api/http'
import store from '@/store'
import * as projectConfig from '@root/project-config'

Vue.use(dfview, {
  socket: Vue.prototype.$socket, // socket 通信
  sockets: Vue.prototype.sockets, // socket 通信
  axios: request, // axios 接口api
  store: store, // store 通信
  projectConfig, // 项目配置项
  modalSize: {
    top: 127,
    left: 200
  }
})

console.log('----dfview---- version: ' + dfview.version)
