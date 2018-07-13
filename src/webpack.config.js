const path = require('path');
const express = require('express');
const app = require('./backend/app')

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'app.bundle.js'
  },
  devServer: {
    before: function (devApp) {
      devApp.use(express.static('./public'));
      devApp.use('/', app);
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
      }, {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            emitFile: true,
            useRelativePath: true,
            outputPath: path.join(__dirname, './public/images')
          }
        }],
      }
    ]
  }
};
