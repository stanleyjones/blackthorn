const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/client`,
  entry: './index.js',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
      },
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
