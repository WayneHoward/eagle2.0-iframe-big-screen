const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const path = require('path')
// const devUrl = 'http://192.168.0.49' // 开发环境
const name = 'big-screen' // page ti

function resolve(dir) {
  return path.join(__dirname, dir)
}// tle

module.exports = {
  pages: {
    // 主页面
    index: {
      entry: 'src/pages/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      css: {},
      // 添加全局sass变量
      scss: {
        prependData: '@import "~@/style/var.scss";' // 全局sass变量地址
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // lib-flexible 将屏幕分成10份(10rem)，这里设置表示设计图宽度为10*37.5=375px
            // 配置成 37.5 是为了兼容 没有适配 rem 布局的第三方 ui 库
            remUnit: 100
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    config.plugins.push()
    const plugins = [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/components/entry-skeleton.js')
          }
        },
        minimize: true, // SPA 下是否需要压缩注入 HTML 的 JS 代码
        quiet: true, // 在服务端渲染时是否需要输出信息到控制台
        router: {
          routes: [{
            path: '/phone',
            skeletonId: 'skeleton1'
          },
          {
            path: '',
            skeletonId: 'skeleton1'
          }
          ]
        }
      })]
    return {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: name,
      resolve: {
        alias: {
          '@': resolve('src'),
          'utils': resolve('src/utils')
        }
      },
      plugins
    }
  },
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/eagle2': {
        target: `http://192.168.0.26:18080`,
        changeOrigin: true,
        secure: true
      }
    }
  }
}
