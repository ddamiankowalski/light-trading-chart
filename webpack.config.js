const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    globalObject: 'this',
    library: {
      name: 'lightTradingChart',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /webpack.config.js/],
      },
    ],
  },
  devtool: 'source-map',
    devServer: {
      static: './dist',
  },
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};