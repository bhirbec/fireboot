const path = require('path');
const app = require('./backend/app')
const indexHtml = path.join(__dirname, "./frontend", "index.html");


module.exports = {
  mode: 'development',
  entry: [
    './frontend/index.js',
    indexHtml
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/[name].[hash].js'
  },
  devServer: {
    // before: function (devApp) {
    //   devApp.use('/', app);
    // },
    contentBase: path.join(__dirname, './public'),
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
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              outputPath: path.join(__dirname, './public/images')
            }
          },
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
        ]
      }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              outputPath: path.join(__dirname, './public/images')
            }
          }
        ],
      },
      {
        test: indexHtml,
        use: [
          {
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
            }
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "link:href"],
              interpolate: true,
            },
          },
        ],
      }
    ]
  }
};
