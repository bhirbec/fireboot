const path = require('path');

const BuildWebsite = require('./plugins/website');
const publicDir = path.join(__dirname, './public');
const indexHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/index.html");
const notFoundHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/404.html");
const layoutHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/layout.html");

module.exports = {
  mode: 'development',
  entry: {
    'app.bundle.js': './frontend/index.js',
    '_/index.js': indexHtml,
    '_/notFound.js': notFoundHtml,
    '_/layout.js': layoutHtml,
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: (chunk) => {
      const arr = chunk.chunk.name.split('.');
      const l = arr.length - 1;
      arr.splice(l, 0, chunk.chunk.contentHash.javascript);
      return arr.join('.');
    },
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
  plugins: [
    new BuildWebsite()
  ],
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
        test: /\.html$/,
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
              attrs: ["img:src", "link:href", "script:src"],
              interpolate: true,
            },
          },
        ],
      }
    ]
  }
};
