var path = require('path');
const express = require('express');
var app = require('../functions/server')


module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app.bundle.js'
  },
  devServer: {
    before: function (devApp) {
      devApp.use(express.static(path.join(__dirname, "../public")))
      devApp.get('*', app);
    },
    historyApiFallback: true,
    host: "localhost",
    publicPath: "/",
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: "style-loader!css-loader"
        }
      }
    ]
  }
};
