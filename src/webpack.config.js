const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BuildWebsite = require('./plugins/website');
const publicDir = path.join(__dirname, './public');
const layoutHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/layout.html");
const indexHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/index.html");
const signinHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/signin.html");
const appHtml = path.join(__dirname, "./app/app.html.ejs");
const notFoundHtml = path.join(__dirname, "./landing-page/startbootstrap-landing-page/html/404.html");


module.exports = [(env, argv) => {
  argv = argv || {};

  return {
    mode: 'development',
    entry: {
      '_/layout.js': layoutHtml,
      '_/index.js': indexHtml,
      '_/signin.js': signinHtml,
      '_/notFound.js': notFoundHtml,
    },
    output: {
      path: path.resolve(__dirname, './public'),
    },
    plugins: [
      new BuildWebsite({
        firebaseConfig: require(argv['firebase-config']),
      })
    ],
    module: {
      rules: [
        htmlRule,
        cssRule,
        minCSSRule,
        imgRule,
        fontRule,
      ]
    }
  }
}, (env, argv) => {
  argv = argv || {};

  return {
    mode: 'development',
    entry: {
      'app': './app/index.js',
    },
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'js/[name].[hash].js',
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
      new HtmlWebpackPlugin({
        filename: 'app.html',
        template: appHtml,
        inject: 'head',
        templateParameters: {
          'FIREBASE_CONFIG': require(argv['firebase-config'])
        }
      }),
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
        cssRule,
        imgRule,
        fontRule,
      ]
    }
  }
}];


const cssRule = {
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
};

const minCSSRule = {
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
};

const htmlRule = {
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
};

const fontRule = {
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
};

const imgRule = {
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
};
