const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import ('webpack').Configuration} */
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.png', '.ico'],
  },
  mode: 'development',
  entry: './src/js/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'source-map-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: '/dist',
  },
}
