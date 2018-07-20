const path = require('path');

const timestamp = new Date().getTime();
const publicDir = path.join(__dirname, './public');
const indexHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/index.html");

module.exports = {
  mode: 'development',
  entry: [
    './frontend/index.js',
    indexHtml
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: `js/[name].${timestamp}.js`
  },
  devServer: {
    contentBase: publicDir,
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
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: 'css/[name].[hash].[ext]',
            }
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "css-loader"
          },
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: 'images/[name].[hash].[ext]',
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: 'fonts/[name].[hash].[ext]',
            }
          }
        ]
      },
      {
        test: /\.min\.js$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: 'js/[name].[hash].[ext]',
            }
          }
        ]
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
            loader: path.resolve('./loaders/replace-string.js'),
            options: {
              search: '<script src="/js/main.js"></script>',
              replace: `<script src="/js/main.${timestamp}.js"></script>`,
            }
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "link:href", "script:src"],
              interpolate: true,
            },
          },
        ],
      }
    ]
  }
};
