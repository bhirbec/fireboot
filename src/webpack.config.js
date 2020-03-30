const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BuildWebsite = require('./plugins/website');
const publicDir = path.join(__dirname, './public');
const layoutHtml = path.join(__dirname, "./landing-page/html/layout.html");
const indexHtml = path.join(__dirname, "./landing-page/html/index.html");
const signinHtml = path.resolve(__dirname, "./landing-page/html/signin.html");
const appHtml = path.join(__dirname, "./app/app.html.ejs");
const notFoundHtml = path.join(__dirname, "./landing-page/html/404.html");


module.exports = [(env, argv) => {
  argv = argv || {};

  return {
    mode: 'development',
    entry: {
      'app': path.resolve(__dirname, "./landing-page/js/signin.js"),
    },
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'js/[name].[hash].js',
    },
    plugins: [
      new webpack.DefinePlugin({
        FIREBASE_CONFIG: JSON.stringify(require(argv['firebase-config'])),
      }),
      new HtmlWebpackPlugin({
        filename: 'layout.html',
        template: layoutHtml,
        inject: null,
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: indexHtml,
        inject: null,
      }),
      new HtmlWebpackPlugin({
        filename: 'signin.html',
        template: signinHtml,
      }),
      new HtmlWebpackPlugin({
        filename: '404.html',
        template: notFoundHtml,
      }),
      new BuildWebsite(),
    ],
    module: {
      rules: [
        babelRule,
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
        babelRule,
        cssRule,
        imgRule,
        fontRule,
      ]
    }
  }
}];


const babelRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['env', 'react']
    }
  }
};

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
