const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    "index": path.resolve(__dirname, 'src/index.ts')
  },
  mode: 'development',
  plugins: [
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /webpack.config.js/],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: 'source-map',
    devServer: {
    static: './lib',
  },
  output: {
        path: path.resolve(__dirname, 'lib'),
    chunkFilename: '[name].js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts'],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};