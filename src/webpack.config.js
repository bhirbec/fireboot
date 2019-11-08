const path = require('path');

const webpack = require('webpack');
const BuildWebsite = require('./plugins/website');
const publicDir = path.join(__dirname, './public');
const layoutHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/layout.html");
const indexHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/index.html");
const signinHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/signin.html");
const appHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/app.html");
const notFoundHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/404.html");


module.exports = (env, argv) => {
  argv = argv || {};

  return {
    mode: 'development',
    entry: {
      'app.bundle.js': './app/index.js',
      '_/layout.js': layoutHtml,
      '_/index.js': indexHtml,
      '_/signin.js': signinHtml,
      '_/app.js': appHtml,
      '_/notFound.js': notFoundHtml,
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
      new BuildWebsite({
        firebaseConfig: require(argv['firebase-config']),
      })
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
              presets: ['env', 'react']
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
  }
};
