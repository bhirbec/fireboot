var path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: [
      path.join(__dirname, "../public"),
    ],
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
