/* eslint-disable */
import { toFixed } from  'dfview'
import { redirectToLogin } from '../unified-login'

Number.prototype.rawToFixed = Number.prototype.toFixed

Number.prototype.toFixed = function(...arg) {
  return toFixed(this, ...arg);
}

// 暂存一个toFixed，以免被其他应用的全局覆盖
export function toFixedStorage(...arg) {
  return toFixed(this, ...arg)
}

// Number.prototype.toFixed = function (precision) {
//   if (isNaN(this.valueOf())) { // 如果该数值是NaN
//     return 'NaN'
//   }
//
//   var valueStr = this.toString()
//
//   // var regex = new RegExp('^-?\\d+(?:\\.\\d{0,' + precision + '})?')
//   var regex = new RegExp('^-?\\d+(\\.\\d{0,' + precision + '})?')
//
//   var res = regex.exec(valueStr)[0]
//
//   if (res.indexOf('.') === -1) { // 如果不包含小数点
//     if (precision === 0) {
//       return res
//     } else {
//       return res + '.' + '0'.repeat(precision)
//     }
//   } else if (res.split('.')[1].length < precision) { // 包含小数点但是小数位数不足
//     return res.padEnd(res.length + (precision - res.split('.')[1].length), '0')
//   } else {
//     return res
//   }
// }

// 暴露一个全局跳转登录页方法(系统登出功能,是需要调用登出接口,并且清除本地token的)
window.dfsoft_logout = function() {
  // 跳转登陆页面
  redirectToLogin()
}
