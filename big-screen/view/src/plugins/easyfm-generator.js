import Vue from 'vue'
import EasyfmGenerator, { version } from 'easyfm-render'
import request from '@/api/http'
import store from '@/store'
import * as projectConfig from '@root/project-config'
import { microAppMainViewRedirect } from '@/micro-apps/utils'

Vue.use(EasyfmGenerator, {
  axios: request,
  socket: Vue.prototype.$socket,
  store: store,
  projectConfig,
  mapping: {
    page: {},
    dialog: {}
  },
  methods: {
    microAppMainViewRedirect
  }
})

console.log('----easyfm-render---- version: ' + version)
