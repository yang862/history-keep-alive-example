const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../public')
  },
  devServer: {
    static: path.resolve(__dirname, '../public/'),
    port: 9000,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'history-keep-alive example',
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            // 解决 Uncaught ReferenceError: regeneratorRuntime is not defined 报错
            // 使用webpack-dev-server时，.babelrc的配置不生效，所以在这里再配置使之生效
            '@babel/plugin-transform-runtime'
          ]
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, '../src/views/'),
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              'import',
              {
                'libraryName': 'vant',
                'libraryDirectory': 'es',
                'style': true
              }
            ],
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: [
              { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
            ]
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
  }
}