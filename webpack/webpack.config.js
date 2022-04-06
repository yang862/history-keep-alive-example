const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const defaultConfig = merge(common, {
  entry: {
    default: './src/default/index.js'
  },
  output: {
    publicPath: 'https://yang862.github.io/history-default-page/',
    filename: 'chunks/index.[hash].bundle.js',
    chunkFilename: 'chunks/[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist/default/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/default/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
})
const keepAliveConfig = merge(common, {
  entry: {
    'keep-alive': './src/keep-alive/index.js'
  },
  output: {
    publicPath: 'https://yang862.github.io/history-keep-alive-page/',
    filename: 'chunks/index.[hash].bundle.js',
    chunkFilename: 'chunks/[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist/keep-alive/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/keep-alive/index.html',
      filename: 'index.html',
    })
  ]
})
const transitionConfig = merge(common, {
  entry: {
    transition: './src/transition/index.js'
  },
  output: {
    publicPath: 'https://yang862.github.io/history-transition-page/',
    filename: 'chunks/index.[hash].bundle.js',
    chunkFilename: 'chunks/[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist/transition/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/transition/index.html',
      filename: 'index.html',
    })
  ],
})

module.exports = [
  defaultConfig,
  keepAliveConfig,
  transitionConfig,
]