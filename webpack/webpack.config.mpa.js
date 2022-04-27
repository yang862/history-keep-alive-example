const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    default: './src/default/index.js',
    'keep-alive': './src/keep-alive/index.js',
    transition: './src/transition/index.js'
  },
  output: {
    publicPath: '/',
    filename: '[name]/index.[hash].bundle.js',
    chunkFilename: 'chunks/[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      '@keepAlive': path.resolve(__dirname, '../src/keep-alive/'),
      '@transition': path.resolve(__dirname, '../src/transition/'),
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/default/index.html',
      chunks: ['default'],
      filename: 'default/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/keep-alive/index.html',
      chunks: ['keep-alive'],
      filename: 'keep-alive/index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/transition/index.html',
      chunks: ['transition'],
      filename: 'transition/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets'
            }
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: [
              { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
            ],
            less: [
              { loader: 'postcss-loader' }
            ],

          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vant: {
          name: 'vant',
          minChunks: 1,
          test: /[\\/]node_modules[\\/]vant[\\/]/,
          // 优先级更高
          priority: 10
        },
        vendors: {
          name: 'vendors',
          minChunks: 3,
          test: /[\\/]node_modules[\\/]/,
          // 优先级更高
          priority: 9
        },
        // 'transition-vendors': {
        //   name: 'transition-vendors',
        //   minChunks: 3,
        //   chunks(chunk) {
        //     return chunk.name === 'transition';
        //   },
        //   reuseExistingChunk: true,
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: 8
        // },
        // 'transition-initial': {
        //   name: 'transition-initial',
        //   minChunks: 1,
        //   chunks(chunk) {
        //     return chunk.name === 'transition';
        //   },
        //   reuseExistingChunk: true,
        //   priority: 7
        // }
      },
    },
  }
}