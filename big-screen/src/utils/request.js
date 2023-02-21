/**
 * 全局请求封装
 */

import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

// 1 创建axios实例
const service = new axios.create({
  // 设置基础路径
  baseURL: process.env.VUE_APP_BASE_API,
  // 设置超时时间,通常设置为10秒
  timeout: 10000,
  // url ? 后面query查询参数,params对象参数,格式化成字符串形式的方法
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false })
  }
})

window.document.cookie = 'JSESSIONID=9C94BC4E88E7A1D44A6032E928595773; sessionAge=1800'

// 2 处理请求拦截
service.interceptors.request.use(
  config => {
    // 给所有请求加上请求头
    // config.headers['cookie'] = 'JSESSIONID=428CECB10C260127BBD4E91A5FAC0A57; sessionAge=1800'

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 3 处理响应拦截
service.interceptors.response.use(
  response => {
    return response.data
    /* 代码走到这里,证明接口通了,且http响应状态码为200范围,下面开始审查接口业务状态码 */

    // res为接口返回的整体数据
    const res = response.data

    // 如果业务状态码不为20000,则视为接口出现业务错误
    // if (res.status !== 20000) {
    //   // 看是否为登录性质错误(30001为token过期,30002为非法token即篡改的token)
    //   if ([30001, 30002].includes(res.status)) {
    //     // 默认弹出错误性提示
    //     Message({ type: 'error', message: '登录错误: ' + res.message })
    //   } else if (res.status.toString().startsWith('4')) { // 如果是4开头的业务状态码,则表示客户端存在业务错误,表示数据校验类错误
    //     // 默认弹出警告性提示
    //     Message({ type: 'warning', message: '数据校验错误: ' + res.message })
    //   } else if (res.status.toString().startsWith('5')) { // 如果是5开头的业务状态码,则表示服务端存在代码执行错误
    //     // 默认弹出错误性提示
    //     Message({ type: 'error', message: '服务端错误: ' + res.message })
    //   } else { // 如果是其他业务状态码,则直接弹出错误性提示
    //     Message({ type: 'error', message: res.message })
    //   }

    //   // 只要接口有问题,最后就是返回错误的Promise
    //   return Promise.reject(new Error(res.message))
    // } else { // 如果业务状态码为20000,则视为接口没有业务错误
    //   return res.data
    // }
  },
  error => {
    // 走到这里的错误是: 服务不通、跨域、响应超时、http-404、http-500等严重错误,所以直接给出错误提示
    Message({ type: 'error', message: `发生错误: ${error.message}` })

    return Promise.reject(error)
  }
)

// 导出axios实例
export default service
