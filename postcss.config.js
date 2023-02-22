module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions' // 所有主流浏览器最近10版本用
      ],
      grid: true
    },
    'postcss-pxtorem': {
      rootValue: 100, // 换算基数，默认100，这样的话把根标签的字体规定为1rem为100px
      propList: ['*'], // 可以用px 更改到rem的属性，值需要精确匹配。
      unitPrecision: 5, // 允许REM单位增长到的十进制数字
      replace: true, // (布尔值)替换包含REM的规则，而不是添加回退
      meDiaQuery: false, // (布尔值)允许在媒体查询中转换px
      minPixelValue: 3 // 设置要变换的最小像素值（3px会vein转rem）. 默认 0
    },
    'postcss-px2rem-exclude': {
      remUnit: 75,
      exclude: /node_modules/i
    }
  }
}
