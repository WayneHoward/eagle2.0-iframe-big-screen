import request from '@/utils/request'

// get方法
export function get(params) {
  return request.get(`url`, {
    params: params
  })
}

// post方法
export function post(data) {
  return request.post(`url`, data)
}

// post方法
export function put(data) {
  return request.put(`url`, data)
}
// delete
export function fudelete(params) {
  return request.delete('/url', {
    params: params
  })
}
