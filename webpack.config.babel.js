const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
        test: /\.(js)$/
      }
    ]
  },
  resolve: { extensions: ['*', '.js'] },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    historyApiFallback: true,
    hotOnly: true,
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: 'public/index-dist-template.html' })
  ]
};
