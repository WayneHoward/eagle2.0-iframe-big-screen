var os = (function() {
  var ua = navigator.userAgent
  var isWindowsPhone = /(?:Windows Phone)/.test(ua)
  var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  var isAndroid = /(?:Android)/.test(ua)
  var isFireFox = /(?:Firefox)/.test(ua)
  var isChrome = /(?:Chrome|CriOS)/.test(ua)
  var isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  var isPhone = /(?:iPhone)/.test(ua) && !isTablet
  var isPc = !isPhone && !isAndroid && !isSymbian

  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  }
}())

function setRem() {
  if (os.isPc) {
    //  PC端
    // 基准大小
    // const baseSize = 100
    // const basePc = baseSize / 1920 // 表示1920的设计图,使用100PX的默认值
    // let vW = window.innerWidth // 当前窗口的宽度
    // const vH = window.innerHeight // 当前窗口的高度
    // // 非正常屏幕下的尺寸换算
    // const dueH = vW * 1080 / 1920
    // if (vH < dueH) { // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度
    //   vW = vH * 1920 / 1080
    // }
    // const rem = vW * basePc // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值
    // document.documentElement.style.fontSize = `${rem}px`

    const html = document.getElementsByTagName('html')[0]
    let width = document.body.clientWidth || document.documentElement.clientWidth
    width = width < 320 ? 320 : width
    width = width > 640 ? 640 : width
    html.style.fontSize = width / 375 * 100 + 'px'
  }

  if (os.isAndroid || os.isPhone) {
    if (!window.location.href.includes('phone')) {
      window.location.href = '/phone/'
    }

    const html = document.getElementsByTagName('html')[0]
    let width = document.body.clientWidth || document.documentElement.clientWidth
    width = width < 320 ? 320 : width
    width = width > 640 ? 640 : width
    html.style.fontSize = width / 375 * 100 + 'px'
  } else if (os.isTablet) {
    const html = document.getElementsByTagName('html')[0]
    let width = document.body.clientWidth || document.documentElement.clientWidth
    width = width < 320 ? 320 : width
    width = width > 640 ? 640 : width
    html.style.fontSize = width / 375 * 100 + 'px'
    // // location.replace('http://www.onlymid.com.cn/html/2016shujia/wap/')
    // const html = document.getElementsByTagName('html')[0]
    // const oWidth = document.body.clientWidth || document.documentElement.clientWidth
    // html.style.fontSize = oWidth / 375 * 100 + 'px'
  }
  if (os.isAndroid) {
    document.body.addEventListener('focusin', () => {
      // 软键盘弹出的事件处理
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      // 注只针对ios 、处在滚动中位置时
      scrollTop > 0 && this.setState({ className: 'postion-absolute' })
    })
    document.body.addEventListener('focusout', () => {
      // 软键盘收起的事件处理
      this.setState({ className: '' })
    })
  }
}

// // 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}

!(function(doc, win) {
  let evt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
  win.addEventListener(evt, setRem, false)
  doc.addEventListener('DOMContentLoaded', setRem, false)
}(document, window))
