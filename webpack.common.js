const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanPlugin(),
    new CopyWebpackPlugin([
      {from: './src/css', to: 'css'}
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.html'
    })
  ]
}
