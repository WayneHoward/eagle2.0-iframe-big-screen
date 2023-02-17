import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export const vueSocketIo = new VueSocketIO({
  // 是否为开发环境
  debug: process.env.NODE_ENV !== 'production',

  // socket.io 连接配置
  connection: '/',

  options: {
    autoConnect: false
  }
})

Vue.use(vueSocketIo)
