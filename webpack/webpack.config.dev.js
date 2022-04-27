const path = require('path')
const mpa = require('./webpack.config.mpa.js')
const { merge } = require('webpack-merge')

const devConfig = merge(mpa, {
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, '../src/public/'),
    port: 9000,
    open: false,
    hot: true,
    historyApiFallback: {
      index: '/default/index.html',
      rewrites: [
        {
          from: /^\/history-default-page(\/.*)?$/,
          to: '/default/index.html',
        },
        {
          from: /^\/history-keep-alive-page(\/.*)?$/,
          to: '/keep-alive/index.html',
        },
        {
          from: /^\/history-transition-page(\/.*)?$/,
          to: '/transition/index.html',
        },
      ]
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: /node_modules/,
      //   loader: 'babel-loader',
      //   options: {
      //     plugins: [
      //       // 解决 Uncaught ReferenceError: regeneratorRuntime is not defined 报错
      //       // 使用webpack-dev-server时，.babelrc的配置不生效，所以在这里再配置使之生效
      //       '@babel/plugin-transform-runtime'
      //     ]
      //   }
      // },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: path.resolve(__dirname, '../src/views/'),
      //   loader: 'babel-loader',
      //   options: {
      //     plugins: [
      //       [
      //         'import',
      //         {
      //           'libraryName': 'vant',
      //           'libraryDirectory': 'es',
      //           'style': true
      //         }
      //       ],
      //     ]
      //   }
      // },
    ]
  }
})

module.exports = devConfig