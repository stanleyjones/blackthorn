const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/client`,
  entry: './',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  output: {
    filename: 'main.bundle.js',
    path: `${__dirname}/public`,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
};
