const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let publicPath = '/'

// 打包上线，修改publicPath
if (process.env.NODE_ENV === 'production') {
  publicPath = './'
}

module.exports = {
  publicPath,
  assetsDir: 'assets', // 项目打包之后，静态资源会放在这个文件夹下
  lintOnSave: false, // 关闭保存时的lint检查
  productionSourceMap: false, // 不需要生产环境的 source map，将其设置为 false 以加速生产环境构建
  devServer: {
    port: 9090,
    open: false,
    // 配置代理
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://www.hb.top',
        // target: 'http://localhost:8080',
        changeOrigin: true, //开启代理
        // ws: true, // 是否启用websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets')
      }
    }
  },
  css: {
    loaderOptions: {
      // 配置sass全局变量
      sass: {
        prependData:`@import '~@/assets/style/public.scss';`   
      }
    }
  }
}
