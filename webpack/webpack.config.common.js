const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
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
    // new CleanWebpackPlugin(),
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
    minimize: true,
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
          minChunks: 1,
          test: /[\\/]node_modules[\\/]/,
          priority: 9
        },
      },
    },
  },
}